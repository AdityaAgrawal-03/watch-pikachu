import React, { createContext, useContext, useEffect, useReducer } from "react";
import { DataContextTypes } from "./dataContext.types";
import { reducerFunc, initialState } from "../../reducer/reducer";
import axios from "axios";
import { useAuth, setupAuthHeaderForServiceCalls } from "../AuthContext/AuthContext";

export type DataProviderProps = {
  children: React.ReactNode;
};

export const DataContext = createContext<DataContextTypes>({
  state: initialState,
  dispatch: () => null,
});

export const DataProvider = ({ children }: DataProviderProps) => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { success, videos },
        } = await axios.get(
          "https://watch-pikachu-backend.aditya365.repl.co/videos"
        );
        console.log({ success });
        if (success) {
          dispatch({ type: "INITIALIZE_VIDEOS", payload: videos });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { likedVideos } } = await axios.get(
          "https://watch-pikachu-backend.aditya365.repl.co/liked"
        );
        dispatch({ type: "INITIALIZE_LIKED_VIDEOS", payload: likedVideos.videos })

        const {data: {historyVideos }} = await axios.get(
          "https://watch-pikachu-backend.aditya365.repl.co/history"
        );
        dispatch({ type: "INITIALIZE_HISTORY_VIDEOS", payload: historyVideos.videos })
        console.log({ historyVideos });
        const {data: { playlists }} = await axios.get(
          "https://watch-pikachu-backend.aditya365.repl.co/playlists"
        );
        dispatch({ type: "INITIALIZE_PLAYLISTS", payload: playlists.playlists })
        console.log({ playlists })
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      setupAuthHeaderForServiceCalls(token);
      fetchUserData();
    }
  }, [token]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
