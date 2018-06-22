import { combineReducers, Reducer } from "redux";

import { Action } from "../actions";

export type State = {
  method: string;
  isSaving: boolean;
  isLoading: boolean;
  error: string;
};

const method = (state: string = "free", action: Action) => {
  switch (action.kind) {
    case "CHANGE_PAINT_METHOD":
      return action.method;
    default:
      return state;
  }
};

const isSaving = (state: boolean = false, action: Action) => {
  switch (action.kind) {
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
  switch (action.kind) {
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
  switch (action.kind) {
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
