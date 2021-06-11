import { InitialState, Action } from "./reducer.types";

// const defaultPlaylistType = {
//   playlistId: 999,
//   name: "aloo",
//   video: [
//     {
//       id: "1234",
//       url: "bad url",
//       thumbnail: "bad thumbnail",
//       title: "some title",
//       statistics: "kuch toh hai",
//       description: "bekar video",
//       channelName: "does not exist",
//       channelLogo: "kuch nahi hai bhai",
//     },
//   ],
// };

export const initialState: InitialState = {
  liked: [],
  history: [],
  watchLater: [],
  playlist: [
    {
      playlistId: 1,
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
    case "TOGGLE_LIKED":
      const isInLiked = state.liked.find(
        (likedVideoItem) => likedVideoItem.id === action.payload.id
      );
      if (isInLiked) {
        return {
          ...state,
          liked: state.liked.filter(
            (likedVideoItem) => likedVideoItem.id !== action.payload.id
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
          (historyVideoItem) => historyVideoItem.id !== action.payload.id
        ),
      };

    case "CLEAR_SEARCH_HISTORY":
      return { ...state, history: [] };

    case "TOGGLE_WATCH_LATER":
      const isInWatchLater = state.watchLater.find(
        (watchLaterVideoItem) => watchLaterVideoItem.id === action.payload.id
      );

      if (isInWatchLater) {
        return {
          ...state,
          watchLater: state.watchLater.filter(
            (watchLaterVideoItem) =>
              watchLaterVideoItem.id !== action.payload.id
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
            playlistId: action.payload.id,
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
                (videoItem) => videoItem.id === action.payload.video.id
              )
                ? playlist.video.filter(
                    (videoItem) => videoItem.id !== action.payload.video.id
                  )
                : [...playlist.video, action.payload.video],
            };
          } else {
            return { ...playlist };
          }
        }),
      };

    default:
      return state;
  }
};
