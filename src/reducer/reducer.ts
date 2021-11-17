import { InitialState, Action } from "./reducer.types";

export const initialState: InitialState = {
  videos: [],
  liked: [],
  history: [],
  watchLater: [],
  playlist: [],
};

export const reducerFunc = (
  state: InitialState,
  action: Action
): InitialState => {
  switch (action.type) {
    case "INITIALIZE_VIDEOS":
      return { ...state, videos: [...action.payload] };

    case "INITIALIZE_LIKED_VIDEOS":
      return { ...state, liked: [...action.payload] };

    case "INITIALIZE_HISTORY_VIDEOS":
      return { ...state, history: [...action.payload] };

    case "INITIALIZE_PLAYLISTS":
      return { ...state, playlist: [...action.payload] };

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

    case "CREATE_PLAYLIST":
      return {
        ...state,
        playlist: [
          ...state.playlist,
          {
            _id: action.payload._id,
            name: action.payload.name,
            videos: [action.payload.video],
          },
        ],
      };

    case "UPDATE_PLAYLIST":
      return {
        ...state,
        playlist: state.playlist.map((playlist) => {
          if (playlist._id === action.payload._id) {
            return {
              ...playlist,
              videos: playlist.videos.find(
                (videoItem) => videoItem._id === action.payload.video._id
              )
                ? playlist.videos.filter(
                    (videoItem) => videoItem._id !== action.payload.video._id
                  )
                : [...playlist.videos, action.payload.video],
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
          if (playlist._id === action.payload.playlistId) {
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
          (playlist) => playlist._id !== action.payload.playlistId
        ),
      };

    default:
      return state;
  }
};
