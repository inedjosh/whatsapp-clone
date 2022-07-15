import { createContext, useReducer } from "react";
import { reducer } from "./reducer";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    auth: {},
    message: {},
    notify: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
