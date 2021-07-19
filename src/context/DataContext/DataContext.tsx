import React, { createContext, useContext, useEffect, useReducer } from "react";
import { DataContextTypes } from "./dataContext.types";
import { reducerFunc, initialState } from "../../reducer/reducer";
import axios from "axios";

export type DataProviderProps = {
  children: React.ReactNode;
};

export const DataContext = createContext<DataContextTypes>({
  state: initialState,
  dispatch: () => null,
});

export const DataProvider = ({ children }: DataProviderProps) => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { success, videos } } = await axios.get(
          "https://watch-pikachu-backend.aditya365.repl.co/videos"
        );
        console.log({ success });
        if (success) {
          dispatch({ type: "INITIALIZE_VIDEOS", payload: videos })
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
