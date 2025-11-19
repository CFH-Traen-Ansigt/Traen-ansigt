import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
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

// Fetch all exercises once
let { data: Exercises } = await supabase
  .from("Exercises")
  .select("id, name, type, duration, help")
  .order("id", { ascending: true });

const EditProgram = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isRight] = useState(localStorage.getItem("visualNeglect") !== "Venstre");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 50, tolerance: 5 } }),
    useSensor(MouseSensor, { activationConstraint: { delay: 50, tolerance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 50, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (tasks.length > 0 && !isSaved) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [tasks, isSaved]);

  const getProgram = useCallback(async (id) => {
    const res = await supabase.from("Programs").select("name, description").eq("id", id);
    setTitle(res.data[0].name);
    setDescription(res.data[0].description);

    const { data, error } = await supabase
      .from("ExercisesOnPrograms")
      .select(`*, Exercises(name, help, duration)`)
      .eq("program_id", id)
      .order("order", { ascending: true });
    if (error) console.error("Error fetching program:", error);

    const programData = data.map((item) => ({
      exerciseNo: item.exercise_id,
      repititions: item.repetitions,
      duration: item.Exercises.duration,
      title: item.Exercises.name,
      withHelp: item.Exercises.help,
      order: item.order,
      image: `/assets/images/0${item.exercise_id}.webp`,
    }));
    setTasks(programData);
  }, []);

  useEffect(() => { if (id) getProgram(id); }, [id, getProgram]);

  async function updateProgram(formData) {
    let duration = 11;
    tasks.forEach((task) => {
      duration += parseInt(task.repititions) * parseInt(task.duration) + parseInt(task.duration);
    });
    const durationMin = Math.max(1, Math.floor(duration / 60));

    const program = {
      name: formData.title,
      description: formData.description || "Ingen beskrivelse.",
      duration: durationMin,
      image: tasks[0]?.image,
      exercises: tasks.map((t) => ({ id: t.exerciseNo, repetitions: t.repititions })),
    };

    try {
      const { error } = await supabase
        .from("Programs")
        .update({
          name: program.name,
          description: program.description,
          duration: program.duration,
          image: program.image,
        })
        .eq("id", id)
        .select();

      if (error) {
        setShowProgramModal(true);
        console.error("Error saving program:", error);
        return;
      }

      const oldProgram = await supabase
        .from("ExercisesOnPrograms")
        .select("*")
        .eq("program_id", id);

      if (oldProgram.error) console.error("Error fetching old program:", oldProgram.error);

      const exercisesToInsert = program.exercises.map((exercise) => ({
        program_id: id,
        exercise_id: exercise.id,
        repetitions: exercise.repetitions,
        order: program.exercises.indexOf(exercise) + 1,
      }));

      const exercisesToDelete = oldProgram.data.filter(
        (oldEx) => !exercisesToInsert.some((newEx) => newEx.exercise_id === oldEx.exercise_id)
      );

      if (exercisesToDelete.length > 0) {
        await supabase
          .from("ExercisesOnPrograms")
          .delete()
          .in("exercise_id", exercisesToDelete.map((e) => e.exercise_id))
          .eq("program_id", id);
      }

      await supabase.from("ExercisesOnPrograms").upsert(exercisesToInsert, { onConflict: ["program_id", "exercise_id"] });

      setIsSaved(true);
      setShowProgramModal(false);
      setShowCompletedModal(true);
    } catch (error) {
      console.error("Error updating program:", error);
    }
  }

  function SortableTask({ task }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.exerciseNo });
    const style = { transform: CSS.Transform.toString(transform), transition, touchAction: "none" };

    return (
      <div ref={setNodeRef} style={style}>
        <TaskCard
          exerciseNo={task.exerciseNo}
          title={task.title}
          image={task.image}
          withHelp={task.withHelp}
          variant="small"
          repititions={task.repititions}
          tasks={tasks}
          setTasks={setTasks}
          dragHandleProps={listeners}
          dragHandleAttributes={attributes}
        />
      </div>
    );
  }

  return (
    <main>
      <Menu visualSetting={localStorage.getItem("visualNeglect")} topPosition="top-5" />
      <TaskFiltering isRight={isRight} />
      <ProgramModal showModal={showProgramModal} setShowModal={setShowProgramModal} onSubmit={updateProgram} editTitle={title} editDescription={description} />
      <ActionModal
        title="Dit program er nu gemt!"
        cancelButtonText="Nej"
        primaryButtonText="Ja"
        icon="/assets/bookmark-red.svg"
        showModal={showCompletedModal}
        setShowModal={setShowCompletedModal}
        onAccept={() => { window.location.href = "/mit-program"; setShowCompletedModal(false); }}
        onCancel={() => { window.location.href = "/forside"; setShowCompletedModal(false); }}
      >
        <p className="text-lg">Du kan finde dine gemte programmer under "Mine programmer".</p>
        <p className="text-lg">Vil du fortsætte til siden?</p>
      </ActionModal>

      <div className={`fixed flex flex-col top-0 ${isRight ? "left-0 border-r-[5px] border-r-primary" : "right-0 border-l-[5px] border-l-primary"} w-[400px] py-10 h-screen bg-alt-color border-solid`}>
        <h1 className="text-3xl font-bold text-center ">Dit program</h1>
        {!tasks.length > 0 && (
          <div className="mx-8 text-center">
            <h2 className="text-sm mt-2">Når du har valgt nogle øvelser, vil de blive vist her.</h2>
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
          <div className="flex flex-col items-center gap-2 h-dvh pt-2">
            <div className="flex flex-col px-8 items-center gap-2 h-[72dvh] overflow-scroll">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={({ active, over }) => {
                if (!over || active.id === over.id) return;
                setTasks((items) => {
                  const oldIndex = items.findIndex((i) => i.exerciseNo === active.id);
                  const newIndex = items.findIndex((i) => i.exerciseNo === over.id);
                  return arrayMove(items, oldIndex, newIndex);
                });
                setIsSaved(false);
              }}>
                <SortableContext items={tasks.map((t) => t.exerciseNo)} strategy={verticalListSortingStrategy}>
                  {tasks.map((task) => <SortableTask key={task.exerciseNo} task={task} />)}
                </SortableContext>
              </DndContext>
            </div>
            <div className="mt-5">
              <Button type="button" variant="Primary" onClick={() => setShowProgramModal(true)} icon="Bookmark" text="Gem mit program" styling="mx-auto text-2xl gap-4 h-12 px-6" iconStyling="w-5 h-5 mt-[4px]" />
            </div>
          </div>
        )}
      </div>

      <div className="pt-3">
        {["Pande","Øjne","Næse","Mund","Tunge"].map((type) => (
          <TaskList
            key={type}
            headline={type === "Mund" ? "Kinder og mund" : type}
            description={`Disse øvelser fokuserer på området omkring ${type === "Mund" ? "kinderne og munden" : type.toLowerCase()}`}
            setTasks={setTasks}
            tasks={tasks}
            exercises={Exercises.filter((task) => task.type === type)}
            setting={isRight}
            divider={type === "Tunge" ? false : true}
          />
        ))}
      </div>
    </main>
  );
};

export default EditProgram;
