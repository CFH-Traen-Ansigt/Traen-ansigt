import TaskCard from "./TaskCard";
export default function TaskList({ headline, description, tasks, setTasks }) {
  return (
    <div className="ml-[420px] pt-24" id={headline === "Kinder og mund" ? "Mund" : headline}>
      <h2 className="text-3xl font-bold">{headline}</h2>
      <p>{description}</p>
      <div className="grid grid-cols-2 gap-3 w-11/12">
        <TaskCard title="Ræk tunge" setTasks={setTasks} tasks={tasks} exerciseNo={1} /> <TaskCard setTasks={setTasks} tasks={tasks} exerciseNo={2} />{" "}
        <TaskCard setTasks={setTasks} tasks={tasks} exerciseNo={3} />
        <TaskCard setTasks={setTasks} tasks={tasks} exerciseNo={4} />
      </div>
    </div>
  );
}
