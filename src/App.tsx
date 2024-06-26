import { Button, Select } from "flowbite-react";
import TasksModal from "./components/TasksModal";
import { useTodo } from "./hooks/useTodo";
import TodoList from "./components/TodoList";
import { ChangeEvent, useEffect, useState } from "react";
import { Task } from "./types";

export default function App() {
  const { state, dispatch } = useTodo();
  const [filteredTodo, setFilteredTodo] = useState<Task[]>([]);

  useEffect(() => {
    let filtered = state.todos;
    if (state.currentState !== "") {
      const filterState = state.currentState === true;
      filtered = state.todos.filter((todo) => todo.state === filterState);
    }
    setFilteredTodo(filtered);
  }, [state.todos, state.currentState]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let state: boolean;
    if (+e.target.value === 0) {
      state = false;
      dispatch({ type: "add-filter", payload: { state } });
    } else if (+e.target.value === 1) {
      state = true;
      dispatch({ type: "add-filter", payload: { state } });
    }
    if (e.target.value === "") {
      dispatch({ type: "clear-filter" }); // Dispatch a new action to clear the filter
      return; // Exit the function if "todos" is selected
    }
  };

  return (
    <>
      <header className="text-center font-black text-slate-500 text-4xl py-10 uppercase">
        Lista de Tareas
      </header>
      <main className="max-w-3xl mx-auto px-8 space-y-5">
        <div className="flex justify-between">
          <Button onClick={() => dispatch({ type: "open-modal" })} color="blue">
            Agregar Tareas
          </Button>
          <form>
            <Select onChange={handleChange}>
              <option value="">--Selecciona un filtro--</option>
              <option value={0}>Sin completar</option>
              <option value={1}>Completados</option>
            </Select>
          </form>
        </div>
        <TodoList todos={filteredTodo} />
      </main>
      <TasksModal />
    </>
  );
}
