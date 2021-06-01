import { Video } from "../data/data.types";

export type Action =
  | { type: "TOGGLE_LIKED"; payload: Video }
  | { type: "ADD_TO_HISTORY"; payload: Video }
  | { type: "REMOVE_FROM_HISTORY"; payload: Video}
  | { type: "CLEAR_SEARCH_HISTORY" }
  | { type: "TOGGLE_WATCH_LATER"; payload: Video}
 

export type InitialState = {
  liked: Video[];
  history: Video[];
  watchLater: Video[];
};
