import { Task as TaskProp } from "../types";
import Task from "./Task";

type TodoListProps = {
  todos: TaskProp[];
};

export default function TodoList({ todos }: TodoListProps) {
  return (
    <div className="w-full bg-slate-300 rounded-lg shadow-lg p-8 flex flex-col gap-2">
      {todos.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </div>
  );
}
