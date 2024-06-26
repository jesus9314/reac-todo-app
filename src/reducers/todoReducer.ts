import { DraftTask, Task } from "../types";
import { v4 as uuidv4 } from "uuid";

//1. Primero creamos el [type] de las acciones
export type todoActions =
  | { type: "add-todo"; payload: { todo: DraftTask } }
  | { type: "open-modal" }
  | { type: "close-modal" }
  | { type: "delete-todo"; payload: { id: Task["id"] } }
  | { type: "change-state"; payload: { id: Task["id"] } }
  | { type: "get-todo-by-id"; payload: { id: Task["id"] } }
  | { type: "edit-todo"; payload: { task: Task } }
  | { type: "add-filter"; payload: { state: Task["state"] } }
  | { type: "clear-filter" };

//2. Creamos el [type] del estado
export type todoState = {
  todos: Task[];
  modal: boolean;
  editingId: Task["id"];
  currentState: boolean | string;
};

const initialTodos = (): Task[] => {
  const localStorageTodos = localStorage.getItem("todos");
  return localStorageTodos ? JSON.parse(localStorageTodos) : [];
};

//3. creamos el estado inicial
export const initialState: todoState = {
  todos: initialTodos(),
  modal: false,
  editingId: "",
  currentState: "",
};

const createTodo = (DraftTodo: DraftTask): Task => {
  return {
    ...DraftTodo,
    id: uuidv4(),
  };
};

/**
 * 4. Creamos el reducer con los parámetros de state y action con sus respectivos [type]
 */
export const TodoReducer = (
  state: todoState = initialState,
  action: todoActions
) => {
  if (action.type === "add-todo") {
    const todo = createTodo(action.payload.todo);
    return {
      ...state,
      todos: [...state.todos, todo],
      modal: false,
    };
  }
  if (action.type === "open-modal") {
    return {
      ...state,
      modal: true,
    };
  }
  if (action.type === "close-modal") {
    return {
      ...state,
      modal: false,
      editingId: "",
    };
  }
  if (action.type === "delete-todo") {
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== action.payload.id),
    };
  }
  if (action.type === "change-state") {
    const newTodo = state.todos.map((todo) =>
      todo.id === action.payload.id
        ? {
            ...todo,
            state: !todo.state,
          }
        : todo
    );
    return {
      ...state,
      todos: newTodo,
    };
  }
  if (action.type === "get-todo-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }
  if (action.type === "edit-todo") {
    return {
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === action.payload.task.id ? action.payload.task : todo
      ),
      modal: false,
      editingId: "",
    };
  }
  if (action.type === "add-filter") {
    return {
      ...state,
      currentState: action.payload.state,
    };
  }
  if (action.type === "clear-filter") {
    return {
      ...state,
      currentState: "",
    };
  }

  return state;
};

/**
 * Sigue en context/TodoContext.tsx
 */
