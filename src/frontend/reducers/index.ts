import { combineReducers, Reducer } from "redux";

import { Action } from "../actions";
import { PaintKind } from "../../shared/paint";
import { Drawing } from "../../shared/drawing";

const method = (state: PaintKind = PaintKind.Freehand, action: Action) => {
  switch (action.type) {
    case "CHANGE_PAINT_METHOD":
      return action.method;
    default:
      return state;
  }
};

const drawing = (state: Drawing = null, action: Action) => {
  switch (action.type) {
    case "NEW_DRAWING_REQUEST": {
      return new Drawing(action.request.name);
    }
    default:
      return state;
  }
};

const isSaving = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case "NEW_DRAWING_REQUEST":
    case "SAVE_DRAWING_REQUEST":
      return true;
    case "NEW_DRAWING_SUCCESS":
    case "NEW_DRAWING_ERROR":
    case "SAVE_DRAWING_SUCCESS":
    case "SAVE_DRAWING_ERROR":
      return false;
    default:
      return state;
  }
};

const isLoading = (state: boolean = false, action: Action): boolean => {
  switch (action.type) {
    case "LOAD_DRAWING_REQUEST":
      return true;
    case "LOAD_DRAWING_SUCCESS":
    case "LOAD_DRAWING_ERROR":
      return false;
    default:
      return state;
  }
};

const error = (state: string = "", action: Action): string => {
  switch (action.type) {
    case "LOAD_DRAWING_REQUEST":
    case "SAVE_DRAWING_REQUEST":
      return "";
    case "LOAD_DRAWING_ERROR":
    case "SAVE_DRAWING_ERROR":
      return action.error;
    default:
      return state;
  }
};

export type State = {
  method: PaintKind;
  drawing?: Drawing;
  isSaving: boolean;
  isLoading: boolean;
  error: string;
};

export const initialState: State = {
  method: PaintKind.Freehand,
  drawing: null,
  isSaving: false,
  isLoading: false,
  error: ""
};

export const rootReducer = combineReducers<State>({
  method,
  drawing,
  isSaving,
  isLoading,
  error
});
