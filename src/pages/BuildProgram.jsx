import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import Menu from "../components/Menu";
import ProgramModal from "../components/modals/ProgramModal";
import Button from "../components/Button";
import TaskFiltering from "../components/TaskFiltering";
import TaskCard from "../components/TaskCard";
import ActionModal from "../components/modals/ActionModal";
import { supabase } from "../DB/supabaseClient";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Get Tasks From API
//move this to a function so it does not run on every render
let { data: Exercises /*error*/ } = await supabase
  .from("Exercises")
  .select("id, name, type, duration, help")
  .order("id", { ascending: true });

//console.log(Exercises);
//console.log(error);

const BuildProgram = () => {
  const [tasks, setTasks] = useState([]);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [isRight] = useState(
    localStorage.getItem("visualNeglect") !== "Venstre" ? true : false
  );
  const [textSize] = useState(Number(localStorage.getItem("textSize")) || 16);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 50, tolerance: 5 },
    }),
    useSensor(MouseSensor, {
      activationConstraint: { delay: 50, tolerance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 50, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (tasks.length > 0 && !isSaved) {
        e.preventDefault();
        e.returnValue = ""; // Chrome requires returnValue to be set
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSaved, tasks]);

  async function saveProgram(formData) {
    //console.log(formData);

    //duration of the prgoram
    let duration = 11;
    tasks.forEach((task) => {
      let taskRep = parseInt(task.repititions);
      let taskDuration = parseInt(task.duration);
      duration += taskRep * taskDuration + taskDuration;
    });

    let durationMin = Math.floor(duration / 60);
    if (durationMin < 1) {
      durationMin = 1;
    }

    const program = {
      name: formData.title,
      description: formData.description,
      duration: durationMin,
      image: tasks[0].image,
      exercises: tasks.map((task) => ({
        id: task.exerciseNo,
        repetitions: task.repititions,
      })),
    };

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Failed to get user", error);
      return;
    }

    const userId = user.id;
    console.log("Program to save:", program);

    if (program.description === "") {
      program.description = "Ingen beskrivelse.";
    }

    try {
      // Save the program to the database
      const { data, error } = await supabase
        .from("Programs")
        .insert([
          {
            user_id: userId,
            name: program.name,
            description: program.description,
            duration: program.duration,
            image: program.image,
          },
        ])
        .select();

      if (error) {
        setShowProgramModal(true);
        console.error("Error saving program:", error);
        return;
      }

      // Save the exercises to the database
      const programId = data[0].id;
      //console.log("Program ID:", programId);

      const exercisesToInsert = program.exercises.map((exercise) => ({
        program_id: programId,
        exercise_id: exercise.id,
        repetitions: exercise.repetitions,
        order: program.exercises.indexOf(exercise) + 1,
      }));
      const { error: exerciseError } = await supabase
        .from("ExercisesOnPrograms")
        .insert(exercisesToInsert);
      if (exerciseError) {
        setShowProgramModal(true);
        console.error("Error saving exercises:", exerciseError);
        return;
      }
      setIsSaved(true);
      setShowProgramModal(false);
      setShowCompletedModal(true);
    } catch (error) {
      console.error("Error saving program:", error);
    }
  }

  function SortableTask({ task }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: task.exerciseNo });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      touchAction: "none",
    };

    return (
      <div ref={setNodeRef} style={style}>
        <TaskCard
          exerciseNo={task.exerciseNo}
          title={task.title}
          image={`/assets/images/0${task.exerciseNo}.webp`}
          withHelp={task.withHelp}
          variant="small"
          repititions={task.repititions}
          tasks={tasks}
          setTasks={setTasks}
          dragHandleProps={listeners} // Pass listeners to handle
          dragHandleAttributes={attributes} // Pass attributes to handle
        />
      </div>
    );
  }
  //console.log(tasks);
  return (
    <main>
      <Menu
        visualSetting={localStorage.getItem("visualNeglect")}
        topPosition="top-5"
      />
      <TaskFiltering isRight={isRight} />
      <ProgramModal
        showModal={showProgramModal}
        setShowModal={setShowProgramModal}
        onSubmit={saveProgram}
      />
      <ActionModal
        title="Dit program er nu gemt!"
        cancelButtonText="Nej"
        primaryButtonText="Ja"
        icon="/assets/bookmark-red.svg"
        showModal={showCompletedModal}
        setShowModal={setShowCompletedModal}
        onAccept={() => {
          window.location.href = "/mit-program";
          setShowCompletedModal(false);
        }}
        onCancel={() => {
          window.location.href = "/forside";
          setShowCompletedModal(false);
        }}
      >
        <p className="text-lg">
          Du kan finde dine gemte programmer under "Mine programmer".
        </p>
        <p className="text-lg">Vil du fortsætte til siden?</p>
      </ActionModal>
      <div
        className={`fixed flex flex-col top-0 ${
          isRight
            ? "left-0 border-r-[5px] border-r-primary"
            : "right-0 border-l-[5px] border-l-primary"
        } w-[400px] py-10 h-screen bg-alt-color border-solid`}
      >
        <h1 className="text-3xl font-bold text-center ">Dit program</h1>
        {!tasks.length > 0 && (
          <div className="mx-8 text-center">
            <h2
              className="mt-2 font-bold"
              style={{ fontSize: `${textSize}px` }}
            >
              Når du har valgt nogle øvelser, vil de blive vist her.
            </h2>

            <div className="text-start mt-12">
              <p
                className="text-primary font-bold mb-2"
                style={{ fontSize: `${textSize}px` }}
              >
                Sådan gør du:
              </p>

              <ol
                className="flex flex-col gap-2 list-decimal mx-4 font-bold"
                style={{ fontSize: `${textSize}px` }}
              >
                <li>Udvælg de øvelser du gerne vil have i dit program</li>
                <li>Vælg hvor mange repetitioner du gerne vil …</li>
                <li>Tilføj øvelsen ved at trykke på "tilføj"-knappen</li>
                <li>Gem eller afspil dit program</li>
              </ol>
            </div>
          </div>
        )}
        {tasks.length > 0 && (
          <div className="flex flex-col items-center gap-2 h-dvh pt-2 ">
            <div className="flex flex-col px-8 items-center gap-2 h-[72dvh] overflow-scroll">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={({ active, over }) => {
                  if (!over || active.id === over.id) return;
                  setTasks((items) => {
                    const oldIndex = items.findIndex(
                      (i) => i.exerciseNo === active.id
                    );
                    const newIndex = items.findIndex(
                      (i) => i.exerciseNo === over.id
                    );
                    return arrayMove(items, oldIndex, newIndex);
                  });
                  setIsSaved(false);
                }}
              >
                <SortableContext
                  items={tasks.map((t) => t.exerciseNo)}
                  strategy={verticalListSortingStrategy}
                >
                  {tasks.map((task) => (
                    <SortableTask key={task.exerciseNo} task={task} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
            <div className="mt-5">
              <Button
                type="button"
                variant="Primary"
                onClick={() => setShowProgramModal(true)}
                icon="Bookmark"
                text="Gem mit program"
                styling="mx-auto text-2xl gap-4 h-12 px-6"
                iconStyling="w-5 h-5 mt-[4px]"
              />
            </div>
          </div>
        )}
      </div>
      <div className="pt-3">
        <TaskList
          headline="Pande"
          description="Disse øvelser fokuserer på området omkring panden"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Pande")}
          setting={isRight}
        />
        <TaskList
          headline="Øjne"
          description="Disse øvelser fokuserer på øjnene"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Øjne")}
          setting={isRight}
        />
        <TaskList
          headline="Næse"
          description="Disse øvelser fokuserer på området omkring næsen"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Næse")}
          setting={isRight}
        />
        <TaskList
          headline="Kinder og mund"
          description="Disse øvelser fokuserer på området omkring kinderne og munden"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Mund")}
          setting={isRight}
        />

        <TaskList
          divider={false}
          headline="Tunge"
          description="Disse øvelser fokuserer på tungen"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Tunge")}
          setting={isRight}
        />
      </div>
    </main>
  );
};

export default BuildProgram;
