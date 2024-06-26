import { Button, Datepicker, Label, Modal, TextInput } from "flowbite-react";
import { useTodo } from "../hooks/useTodo";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { DraftTask } from "../types";
import { formatDate } from "../helpers";
import ErrorMessage from "./ErrorMessage";

export default function TasksModal() {
  const { state, dispatch } = useTodo();
  const [error, setError] = useState("");
  const [todo, setTodo] = useState<DraftTask>({
    name: "",
    state: false,
    limitDate: new Date(),
  });

  useEffect(() => {
    if (!state.editingId) {
      setError("");
    }
  }, [state.modal]);

  useEffect(() => {
    if (state.editingId) {
      const editingTask = state.todos.filter(
        (task) => task.id === state.editingId
      )[0];
      setTodo(editingTask);
    }
  }, [state.editingId]);

  const isEditing = (): boolean => {
    return state.editingId ? true : false;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo({
      ...todo,
      name: e.target.value,
    });
  };

  const handleChangeDate = (date: Date) => {
    setTodo({
      ...todo,
      limitDate: date,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(todo).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (isEditing()) {
      dispatch({
        type: "edit-todo",
        payload: { task: { id: state.editingId, ...todo } },
      });
    } else {
      dispatch({
        type: "add-todo",
        payload: { todo: todo },
      });
    }
    setTodo({
      name: "",
      state: false,
      limitDate: new Date(),
    });
  };
  return (
    <Modal
      dismissible
      show={state.modal}
      onClose={() => dispatch({ type: "close-modal" })}
    >
      <Modal.Header>
        {isEditing() ? "Editar Tarea" : "Nueva Tarea"}
      </Modal.Header>
      <Modal.Body>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form
          onSubmit={handleSubmit}
          id="form-task"
          className="flex max-w-2xl mx-auto flex-col gap-4"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Tarea" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="Escribe el nombre de la tarea..."
              value={todo.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="date" value="Fecha Límite" />
            </div>
            <Datepicker
              id="date"
              language="es-PE"
              labelTodayButton="Hoy"
              labelClearButton="Limpar"
              value={formatDate(todo.limitDate.toDateString())}
              onSelectedDateChanged={handleChangeDate}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button form="form-task" type="submit">
          {isEditing() ? "Editar Tarea" : "Guardar Tarea"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
