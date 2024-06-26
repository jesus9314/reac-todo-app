import { Dispatch, ReactNode, createContext, useReducer } from "react";
import {
  TodoReducer,
  initialState,
  todoActions,
  todoState,
} from "../reducers/todoReducer";

type TodoContextProps = {
  state: todoState;
  dispatch: Dispatch<todoActions>;
};
type TodoProviderProps = {
  children: ReactNode;
};

//5. creamos el contexto con su [type] correspondientes
export const TodoContext = createContext<TodoContextProps>(
  {} as TodoContextProps
);

//6. Creamos el Provider
export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

/**
 * sigue en main.tsx
 */
