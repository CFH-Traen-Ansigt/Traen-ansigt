import { useRef, useState } from "react";
import TaskList from "../components/TaskList";
import Menu from "../components/Menu";
import ProgramModal from "../components/modals/ProgramModal";
import Button from "../components/Button";
import TaskFiltering from "../components/TaskFiltering";
import TaskCard from "../components/TaskCard";
import ActionModal from "../components/modals/ActionModal";
import { supabase } from "../DB/supabaseClient";
import { useEffect } from "react";
import { useCallback } from "react";
import { useParams } from "react-router-dom";


// Get Tasks From API
//move this to a function so it does not run on every render
let { data: Exercises /*error*/ } = await supabase.from("Exercises").select("id, name, type, duration, help").order("id", { ascending: true });


const EditProgram = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const dragTask = useRef(null);
  const draggedOverTask = useRef(null);
  const [isRight] = useState(localStorage.getItem("visualNeglect") !== "Venstre" ? true : false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSort() {
    if (dragTask.current === null || draggedOverTask.current === null) return;

    const tasksClone = [...tasks];
    const draggedItem = tasksClone[dragTask.current];
    tasksClone.splice(dragTask.current, 1);
    tasksClone.splice(draggedOverTask.current, 0, draggedItem);

    setTasks(tasksClone);
  }

  
  const getProgram = useCallback(async (id) => {
    const res = await supabase.from("Programs").select("name, description").eq("id", id);

    setTitle(res.data[0].name);
    setDescription(res.data[0].description);

    const { data, error } = await supabase
      .from("ExercisesOnPrograms")
      .select(`*,
        Exercises(name, help)`)
      .eq("program_id", id)
      .order("order", { ascending: true });
    if (error) {
      console.error("Error fetching program:", error);
    }
    let programData = [];
    data.forEach((item) => {
      programData.push({
        exerciseNo: item.exercise_id,
        repititions: item.repetitions,
        title: item.Exercises.name,
        withHelp: item.Exercises.help,
        order: item.order
      });
    });

    setTasks(programData);


  }, [description, title]);

  useEffect(() => {
    if (id) {
      getProgram(id);
    }
  }, [getProgram, id]);

  

  async function updateProgram(formData) {
    console.log(formData);
    const program = {
      name: formData.title,
      description: formData.description,
      exercises: tasks.map((task) => ({
        id: task.exerciseNo,
        repetitions: task.repititions,
      })),
    };

    if (program.description === "") {
      program.description = "Ingen beskrivelse.";
    }

    try {
      // Save the program to the database
      const {  error } = await supabase
        .from("Programs")
        .update([
          {
            name: program.name,
            description: program.description,
          },
        ])
        .eq("id", id)
        .select();

      if (error) {
        setShowProgramModal(true);
        console.error("Error saving program:", error);
        return;
      }

      const oldProgram = await supabase
        .from("ExercisesOnPrograms")
        .select("program_id, exercise_id, repetitions, order")
        .eq("program_id", id);
      if (oldProgram.error) {
        console.error("Error fetching old program:", oldProgram.error);
      }


      // Save the exercises to the database
      const programId = id;

      const exercisesToInsert = program.exercises.map((exercise) => ({
        program_id: programId,
        exercise_id: exercise.id,
        repetitions: exercise.repetitions,
        order: program.exercises.indexOf(exercise) + 1,
      }));
      
      const exercisesToDelete = oldProgram.data.filter(
        (oldExercise) => !exercisesToInsert.some((newExercise) => newExercise.exercise_id === oldExercise.exercise_id)
      );

      if (exercisesToDelete.length > 0) {

        await supabase
          .from("ExercisesOnPrograms")
          .delete()
          .in(
            "exercise_id",
            exercisesToDelete.map((exercise) => exercise.exercise_id)
          )
          .eq("program_id", programId);
      }

      await supabase
        .from("ExercisesOnPrograms")
        .upsert(exercisesToInsert, { onConflict: ["program_id", "exercise_id"] });
      console.log("Exercises updated successfully");

      
      setShowProgramModal(false);
      setShowCompletedModal(true);
    } catch (error) {
      console.error("Error saving program:", error);
    }
  }
  console.log(tasks);
  return (
    <main>
      <Menu visualSetting={localStorage.getItem("visualNeglect")} />
      <TaskFiltering isRight={isRight} />
      <ProgramModal showModal={showProgramModal} setShowModal={setShowProgramModal} onSubmit={updateProgram} editTitle={title} editDescription={description}/>
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
        <p className="text-lg">Du kan finde dine gemte programmer under "Mine programmer".</p>
        <p className="text-lg">Vil du fortsætte til siden?</p>
      </ActionModal>
      <div
        className={`fixed flex flex-col top-0 ${
          isRight ? "left-0 border-r-[5px] border-r-primary" : "right-0 border-l-[5px] border-l-primary"
        } w-[400px] py-10 h-screen bg-alt-color border-solid`}
      >
        <h1 className="text-3xl font-bold text-center ">Dit program</h1>
        {!tasks.length > 0 && (
          <div className="mx-8 text-center ">
            <h2 className="text-sm mt-2 ">Når du har valgt nogle øvelser, vil de blive vist her.</h2>
            <div className="text-start mt-12">
              <p className="text-primary font-light mb-2">Sådan gør du:</p>
              <ol className="flex flex-col gap-2 list-decimal mx-4 font-light text-sm">
                <li>Udvælg de øvelser du gerne vil have i dit program</li>
                <li>Vælg hvor mange repetitioner du gerne vil have af den pågældende øvelse</li>
                <li>Tilføj øvelsen ved at trykke på "tilføj"-knappen</li>
                <li>Gem eller afspil dit program</li>
              </ol>
            </div>
          </div>
        )}
        {tasks.length > 0 && (
          <div className="flex flex-col items-center gap-2 h-dvh pt-2 ">
            <div className="flex flex-col px-8 items-center gap-2 h-[72dvh] overflow-scroll">
              {tasks.map((task, index) => (
                <TaskCard
                  exerciseNo={task.exerciseNo}
                  title={task.title}
                  image={`/assets/images/0${task.exerciseNo}.webp`}
                  withHelp={task.withHelp}
                  variant="small"
                  repititions={task.repititions}
                  setTasks={setTasks}
                  draggable
                  onDragStart={() => (dragTask.current = index)}
                  onDragEnter={() => (draggedOverTask.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                />
              ))}
            </div>
            <div className="mt-auto">
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
          description="Disse øvelser fokusere på området omkring panden"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Pande")}
          setting={isRight}
        />
        <TaskList
          headline="Øjne"
          description="Disse øvelser fokusere på øjnene"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Øjne")}
          setting={isRight}
        />
        <TaskList
          headline="Næse"
          description="Disse øvelser fokusere på området omkring næsen"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Næse")}
          setting={isRight}
        />
        <TaskList
          headline="Kinder og mund"
          description="Disse øvelser fokusere på området omkring kinderne og munden"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Mund")}
          setting={isRight}
        />

        <TaskList
          divider={false}
          headline="Tunge"
          description="Disse øvelser fokusere på tungen"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Tunge")}
          setting={isRight}
        />
      </div>
    </main>
  );
};

export default EditProgram;
