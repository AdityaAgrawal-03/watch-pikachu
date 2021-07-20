import { Video } from "../data/data.types";

export type Action =
  | { type: "INITIALIZE_VIDEOS"; payload: Video[] }
  | { type: "INITIALIZE_LIKED_VIDEOS"; payload: Video[] }
  | { type: "INITIALIZE_HISTORY_VIDEOS"; payload: Video[] }
  | { type: "INITIALIZE_PLAYLISTS"; payload: Playlist[] }
  | { type: "TOGGLE_LIKED"; payload: Video }
  | { type: "ADD_TO_HISTORY"; payload: Video }
  | { type: "REMOVE_FROM_HISTORY"; payload: Video }
  | { type: "CLEAR_SEARCH_HISTORY" }
  | { type: "TOGGLE_WATCH_LATER"; payload: Video }
  | {
      type: "CREATE_PLAYLIST";
      payload: { _id: string, name: string; video: Video };
    }
  | { type: "UPDATE_PLAYLIST"; payload: { _id: string; video: Video } }
  | {
      type: "UPDATE_PLAYLIST_NAME";
      payload: { playlistId: string; name: string };
    }
  | { type: "DELETE_PLAYLIST"; payload: { playlistId: string } };

export type InitialState = {
  videos: Video[];
  liked: Video[];
  history: Video[];
  watchLater: Video[];
  playlist: Playlist[];
};

export type Playlist = {
  _id: string;
  name: string;
  videos: Video[];
};
