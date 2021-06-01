import { InitialState, Action } from "./reducer.types";

export const initialState: InitialState = {
  liked: [],
  history: [],
  watchLater: [],
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

    default:
      return state;
  }
};
