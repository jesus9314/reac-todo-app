import { Checkbox } from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { formatDate } from "../helpers";
import { useTodo } from "../hooks/useTodo";
import { Task as TaskProp } from "../types";

type TodoProps = {
  task: TaskProp;
};
export default function Task({ task }: TodoProps) {
  const { dispatch } = useTodo();

  const getNameClass = (): string => {
    const className = "capitalize text-slate-500";
    return task.state ? `${className} line-through` : className;
  };

  const limitDate = new Date(task.limitDate)
  return (
    <div className="bg-white p-4 flex justify-between">
      <div className="flex gap-4 items-center">
        <Checkbox
          color="success"
          checked={task.state}
          onChange={() =>
            dispatch({ type: "change-state", payload: { id: task.id } })
          }
        />
        <div className="">
          <p className={getNameClass()}>{task.name}</p>
          <p className="capitalize">
            <span className="font-semibold">Límite: </span>
            {formatDate(limitDate.toDateString())}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-slate-600 hover:text-slate-700 transition">
        <button
          onClick={() =>
            dispatch({ type: "delete-todo", payload: { id: task.id } })
          }
          className="bg-slate-200 hover:bg-slate-300 transition p-2 rounded-md"
        >
          <MdDelete className="text-2xl text-center" />
        </button>
        <button
          disabled={task.state}
          onClick={() =>
            dispatch({ type: "get-todo-by-id", payload: { id: task.id } })
          }
          className="bg-slate-200 hover:bg-slate-300 transition p-2 rounded-md disabled:bg-slate-800 disabled:text-white"
        >
          <FaEdit className="text-2xl text-center" />
        </button>
      </div>
    </div>
  );
}
