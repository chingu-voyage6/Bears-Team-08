import { combineReducers, Reducer } from "redux";

import { Action } from "../actions";
import { PaintKind, UserJSON, ID } from "@shared/contract";
import { Drawing } from "@shared/drawing";

const paintMethod = (state: PaintKind = PaintKind.Freehand, action: Action) => {
  switch (action.type) {
    case "CHANGE_PAINT_METHOD":
      return action.method;
    default:
      return state;
  }
};

const isDrawing = (state: boolean = false, action: Action): boolean => {
  switch (action.type) {
    case "CREATE_DRAWING_REQUEST":
      return true;
    case "NAV_TO_EXPLORER":
      return false;
    default:
      return state;
  }
};

const drawing = (state: Drawing = null, action: Action): Drawing => {
  switch (action.type) {
    case "CREATE_DRAWING_REQUEST": {
      return new Drawing(action.request.name);
    }
    case "CREATE_DRAWING_SUCCESS": {
      return action.response.drawing;
    }
    default:
      return state;
  }
};

const drawings = (state: Drawing[] = [], action: Action): Drawing[] => {
  console.log(action);
  switch (action.type) {
    case "FETCH_DRAWINGS_SUCCESS":
      return state.concat(action.response.drawings);
    default:
      return state;
  }
};

const isSaving = (state: boolean = false, action: Action): boolean => {
  switch (action.type) {
    case "UNDO_REQUEST":
    case "CREATE_DRAWING_REQUEST":
    case "SAVE_DRAWING_REQUEST":
      return true;
    case "UNDO_SUCCESS":
    case "UNDO_ERROR":
    case "CREATE_DRAWING_SUCCESS":
    case "CREATE_DRAWING_ERROR":
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
    case "FETCH_DRAWINGS_REQUEST":
      return true;
    case "FETCH_DRAWINGS_SUCCESS":
    case "FETCH_DRAWINGS_ERROR":
    case "LOAD_DRAWING_ERROR":
    case "LOAD_DRAWING_SUCCESS":
      return false;
    default:
      return state;
  }
};

const error = (state: string = "", action: Action): string => {
  switch (action.type) {
    case "FETCH_DRAWINGS_ERROR":
    case "LOAD_DRAWING_ERROR":
    case "LOGIN_USER_ERROR":
    case "SAVE_DRAWING_ERROR":
      return action.error;
    default:
      return state;
  }
};

const token = (state: string = "", action: Action): string => {
  switch (action.type) {
    case "LOGIN_USER_SUCCESS":
      return action.response.token;
    default:
      return state;
  }
};

const user = (state: UserJSON = {}, action: Action): UserJSON => {
  switch (action.type) {
    case "LOGIN_USER_SUCCESS":
      return action.response.user;
    default:
      return state;
  }
};

export type State = {
  drawing?: Drawing;
  drawings: Drawing[];
  error: string;
  isDrawing: boolean;
  isLoading: boolean;
  isSaving: boolean;
  paintMethod: PaintKind;
  token?: string;
  user?: UserJSON;
};

export const initialState: State = {
  drawing: null,
  drawings: [],
  error: "",
  isDrawing: false,
  isLoading: false,
  isSaving: false,
  paintMethod: PaintKind.Freehand,
  token: "",
  user: {}
};

export const rootReducer = combineReducers<State>({
  drawing,
  drawings,
  error,
  isDrawing,
  isLoading,
  isSaving,
  paintMethod,
  token,
  user
});
