import TaskCard from "./TaskCard";
export default function TaskList({ headline, description, exercises, tasks, setTasks, divider = true }) {
  return (
    <div className={`ml-[420px] pt-20 mx-6 pb-8 ${divider && "border-b-4 border-b-alt-color"}`} id={headline === "Kinder og mund" ? "Mund" : headline}>
      <h2 className="text-3xl font-bold">{headline}</h2>
      <p>{description}</p>
      <div className="grid xl:grid-cols-2 gap-3 w-11/12">
      {exercises.map((task, index) => (
        <TaskCard
          exerciseNo={task.id}
          title={task.name}
          withHelp={task.help}
          tasks={tasks}
          setTasks={setTasks}
        />
      ))}
      </div>
    </div>
  );
}