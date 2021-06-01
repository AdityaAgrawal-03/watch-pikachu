import React, { createContext, useContext, useReducer } from "react";
import { DataContextTypes } from "./dataContext.types";
import { reducerFunc, initialState } from "../../reducer/reducer";

export type DataProviderProps = {
  children: React.ReactNode;
};

export const DataContext = createContext<DataContextTypes>({
  state: initialState,
  dispatch: () => null,
});

export const DataProvider = ({ children }: DataProviderProps) => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
