import { InitialState, Action } from "./reducer.types";
import { v4 as uuidv4 } from "uuid";

export const initialState: InitialState = {
  videos: [],
  liked: [],
  history: [],
  watchLater: [],
  playlist: [
    {
      playlistId: uuidv4(),
      name: "Watch Later",
      video: [],
    },
  ],
};

export const reducerFunc = (
  state: InitialState,
  action: Action
): InitialState => {
  switch (action.type) {
    case "INITIALIZE_VIDEOS":
      console.log("from reducer", action.payload);
      return { ...state, videos: [...action.payload] };

    case "TOGGLE_LIKED":
      const isInLiked = state.liked.find(
        (likedVideoItem) => likedVideoItem._id === action.payload._id
      );
      if (isInLiked) {
        return {
          ...state,
          liked: state.liked.filter(
            (likedVideoItem) => likedVideoItem._id !== action.payload._id
          ),
        };
      }
      return { ...state, liked: [...state.liked, action.payload] };

    case "ADD_TO_HISTORY":
      return { ...state, history: [...state.history, action.payload] };

    case "REMOVE_FROM_HISTORY":
      return {
        ...state,
        history: state.history.filter(
          (historyVideoItem) => historyVideoItem._id !== action.payload._id
        ),
      };

    case "CLEAR_SEARCH_HISTORY":
      return { ...state, history: [] };

    case "TOGGLE_WATCH_LATER":
      const isInWatchLater = state.watchLater.find(
        (watchLaterVideoItem) => watchLaterVideoItem._id === action.payload._id
      );

      if (isInWatchLater) {
        return {
          ...state,
          watchLater: state.watchLater.filter(
            (watchLaterVideoItem) =>
              watchLaterVideoItem._id !== action.payload._id
          ),
        };
      }
      return { ...state, watchLater: [...state.watchLater, action.payload] };

    case "CREATE_PLAYLIST":
      return {
        ...state,
        playlist: [
          ...state.playlist,
          {
            playlistId: action.payload.playlistId,
            name: action.payload.name,
            video: [action.payload.video],
          },
        ],
      };

    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.map((playlist) => {
          if (playlist.playlistId === action.payload.playlistId) {
            return {
              ...playlist,
              video: playlist.video.find(
                (videoItem) => videoItem._id === action.payload.video._id
              )
                ? playlist.video.filter(
                    (videoItem) => videoItem._id !== action.payload.video._id
                  )
                : [...playlist.video, action.payload.video],
            };
          } else {
            return { ...playlist };
          }
        }),
      };

    case "UPDATE_PLAYLIST_NAME":
      return {
        ...state,
        playlist: state.playlist.map((playlist) => {
          if (playlist.playlistId === action.payload.playlistId) {
            return {
              ...playlist,
              name: action.payload.name,
            };
          } else {
            return { ...playlist };
          }
        }),
      };

    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.filter(
          (playlist) => playlist.playlistId !== action.payload.playlistId
        ),
      };

    default:
      return state;
  }
};
