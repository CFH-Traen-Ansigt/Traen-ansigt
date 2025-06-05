import React from "react";
import { useRef, useState } from "react";
import TaskList from "../components/TaskList";
import Menu from "../components/Menu";
import ProgramModal from "../components/ProgramModal";
import Button from "../components/Button";
import TaskFiltering from "../components/TaskFiltering";
import TaskCard from "../components/TaskCard";
import ActionModal from "../components/ActionModal";
import { supabase } from "../DB/supabaseClient";

// Get Tasks From API
//move this to a function so it does not run on every render
let { data: Exercises, /*error*/ } = await supabase
  .from("Exercises")
  .select("id, name, type, duration, help")
  .order("id", { ascending: true });

//console.log(Exercises);
//console.log(error);

const BuildProgram = () => {
  const [tasks, setTasks] = useState([]);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const dragTask = useRef(null);
  const draggedOverTask = useRef(null);

  function handleSort() {
    if (dragTask.current === null || draggedOverTask.current === null) return;

    const tasksClone = [...tasks];
    const draggedItem = tasksClone[dragTask.current];
    tasksClone.splice(dragTask.current, 1);
    tasksClone.splice(draggedOverTask.current, 0, draggedItem);

    setTasks(tasksClone);
  }

  async function saveProgram(formData) {
    console.log(formData);
    const program = {
      name: formData.title,
      description: formData.description,
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

    try{

    
    // Save the program to the database
    const { data, error } = await supabase
      .from("Programs")
      .insert([{ user_id: userId, name: program.name, description: program.description }])
      .select();

    if (error) {
      setShowProgramModal(true);
      console.error("Error saving program:", error);
      return;
    }

    // Save the exercises to the database
    const programId = data[0].id;
    console.log("Program ID:", programId);

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
    setShowProgramModal(false);
    setShowCompletedModal(true);

    } catch (error) {
      console.error("Error saving program:", error);
    }
  }
  console.log(tasks);
  return (
    <main>
      <Menu />
      <TaskFiltering />
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
      <div className="fixed flex flex-col top-0 left-0 w-[400px] py-10 h-screen bg-alt-color border-r-[5px] border-r-primary border-solid">
        <h1 className="text-3xl font-bold text-center ">Dit program</h1>
        {!tasks.length > 0 && (
          <div className="mx-8 text-center ">
            <h2 className="text-sm mt-2 ">
              Når du har valgt nogle øvelser, vil de blive vist her.
            </h2>
            <div className="text-start mt-12">
              <p className="text-primary font-light mb-2">Sådan gør du:</p>
              <ol className="flex flex-col gap-2 list-decimal mx-4 font-light text-sm">
                <li>Udvælg de øvelser du gerne vil have i dit program</li>
                <li>
                  Vælg hvor mange repetitioner du gerne vil have af den
                  pågældende øvelse
                </li>
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
        />
        <TaskList
          headline="Øjne"
          description="Disse øvelser fokusere på øjnene"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Øjne")}
        />
        <TaskList
          headline="Næse"
          description="Disse øvelser fokusere på området omkring næsen"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Næse")}
        />
        <TaskList
          headline="Kinder og mund"
          description="Disse øvelser fokusere på området omkring kinderne og munden"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Mund")}
        />

        <TaskList
          divider={false}
          headline="Tunge"
          description="Disse øvelser fokusere på tungen"
          setTasks={setTasks}
          tasks={tasks}
          exercises={Exercises.filter((task) => task.type === "Tunge")}
        />
      </div>
    </main>
  );
};

export default BuildProgram;
