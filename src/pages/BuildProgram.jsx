import React from "react";
import { useRef, useState } from "react";
import TaskList from "../components/TaskList";
import Menu from "../components/Menu";
import ProgramModal from "../components/ProgramModal";
import Button from "../components/Button";
import TaskFiltering from "../components/TaskFiltering";
import TaskCard from "../components/TaskCard";
import CompletedModal from "../components/CompletedModal";

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
    setTasks(tasksClone);
  }
  console.log(tasks);
  return (
    <main>
      <Menu />
      <TaskFiltering />
      <ProgramModal showModal={showProgramModal} setShowModal={setShowProgramModal} onSubmit={() => setShowCompletedModal(true)} />
      <CompletedModal showModal={showCompletedModal} setShowModal={setShowCompletedModal} onSubmit={() => setShowCompletedModal(true)} />
      <div className="fixed flex flex-col top-0 left-0 w-[400px] py-10 h-screen bg-alt-color border-r-[5px] border-r-primary border-solid">
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
            <div className="flex flex-col items-center gap-2 h-[72dvh] overflow-scroll">
              {tasks.map((task, index) => (
                <TaskCard
                  exerciseNo={task.exerciseNo}
                  title={task.title}
                  image={task.image}
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
        <TaskList headline="Pande" description="Disse øvelser fokusere på området omkring panden" setTasks={setTasks} tasks={tasks} />
        <TaskList headline="Øjne" description="Disse øvelser fokusere på øjnene" setTasks={setTasks} />
        <TaskList headline="Næse" description="Disse øvelser fokusere på området omkring næsen" setTasks={setTasks} tasks={tasks} />
        <TaskList headline="Kinder og mund" description="Disse øvelser fokusere på området omkring kinderne og munden" setTasks={setTasks} tasks={tasks} />

        <TaskList divider={false} headline="Tunge" description="Disse øvelser fokusere på tungen" setTasks={setTasks} tasks={tasks} />
      </div>
    </main>
  );
};

export default BuildProgram;
