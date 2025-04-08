import TaskCard from "./TaskCard";
export default function TaskList({ headline, description, tasks, setTasks, divider = true }) {
  return (
    <div className={`ml-[420px] pt-20 mx-6 pb-8 ${divider && "border-b-4 border-b-alt-color"}`} id={headline === "Kinder og mund" ? "Mund" : headline}>
      <h2 className="text-3xl font-bold">{headline}</h2>
      <p>{description}</p>
      <div className="grid xl:grid-cols-2 gap-3 w-11/12">
        <TaskCard title="Rynk brynene" setTasks={setTasks} tasks={tasks} exerciseNo={1} /> <TaskCard setTasks={setTasks} tasks={tasks} exerciseNo={2} />{" "}
        <TaskCard title="Rynk brynene" setTasks={setTasks} tasks={tasks} exerciseNo={3} withHelp />
        <TaskCard setTasks={setTasks} tasks={tasks} exerciseNo={4} withHelp />
        <TaskCard setTasks={setTasks} tasks={tasks} exerciseNo={5} />
        <TaskCard setTasks={setTasks} tasks={tasks} exerciseNo={6} />
      </div>
    </div>
  );
}

// make taskcards according to number of tasks that are passed in as props
// Change exerciseNo to be ID from database
// add withHelp according to the data from the database