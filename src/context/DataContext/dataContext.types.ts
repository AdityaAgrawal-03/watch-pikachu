import { InitialState, Action } from "../../reducer/reducer.types";

export type DataContextTypes = {
  state: InitialState;
  dispatch: React.Dispatch<Action>;
};
