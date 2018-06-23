import { combineReducers, Reducer } from "redux";

import { Action } from "../actions";

const method = (state: string = "free", action: Action) => {
  switch (action.type) {
    case "CHANGE_PAINT_METHOD":
      console.debug("switching method to", action.method);
      return action.method;
    default:
      return state;
  }
};

const isSaving = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case "SAVE_PAINTING_REQUEST":
      return true;
    case "SAVE_PAINTING_SUCCESS":
    case "SAVE_PAINTING_ERROR":
      return false;
    default:
      return state;
  }
};

const isLoading = (state: boolean = false, action: Action): boolean => {
  switch (action.type) {
    case "LOAD_PAINTING_REQUEST":
      return true;
    case "LOAD_PAINTING_SUCCESS":
    case "LOAD_PAINTING_ERROR":
      return false;
    default:
      return state;
  }
};

const error = (state: string = "", action: Action): string => {
  switch (action.type) {
    case "LOAD_PAINTING_REQUEST":
    case "SAVE_PAINTING_REQUEST":
      return "";
    case "LOAD_PAINTING_ERROR":
    case "SAVE_PAINTING_ERROR":
      return action.error;
    default:
      return state;
  }
};

export type State = {
  method: string;
  isSaving: boolean;
  isLoading: boolean;
  error: string;
};

export const initialState: State = {
  method: "free",
  isSaving: false,
  isLoading: false,
  error: ""
};

export const rootReducer = combineReducers<State>({
  method,
  isSaving,
  isLoading,
  error
});
