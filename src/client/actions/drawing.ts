import { PaintKind, ID } from "@shared/contract";
import { Drawing } from "@shared/drawing";
import { Paint } from "@shared/paint";

import { Action, asErr, asReq, asRes, dispatcher, ThunkAction } from "./action";
import * as Api from "../api";

export type GetDrawingsReq = {
  token?: string;
  filters?: any[];
  offset: number;
  limit: number;
};
export type GetDrawingsRes = { drawings: Drawing[] };
export type GetDrawings = ThunkAction<
  "GET_DRAWINGS_REQUEST",
  "GET_DRAWINGS_SUCCESS",
  "GET_DRAWINGS_ERROR",
  GetDrawingsReq,
  GetDrawingsRes
>;

export const getDrawings = dispatcher(Api.getDrawings)<GetDrawings>(
  asReq("GET_DRAWINGS_REQUEST"),
  asRes("GET_DRAWINGS_SUCCESS"),
  asErr("GET_DRAWINGS_ERROR")
);

export type ChangePaintMethod = {
  type: "CHANGE_PAINT_METHOD";
  method: PaintKind;
};

export const changePaintMethod = (method: PaintKind): Action => ({
  type: "CHANGE_PAINT_METHOD",
  method
});

export type UndoReq = { token: string };
export type UndoRes = {};
export type Undo = ThunkAction<
  "UNDO_REQUEST",
  "UNDO_SUCCESS",
  "UNDO_ERROR",
  UndoReq,
  UndoRes
>;

export const undo = dispatcher(Api.undo)<Undo>(
  asReq("UNDO_REQUEST"),
  asRes("UNDO_SUCCESS"),
  asErr("UNDO_ERROR")
);

export type RedoReq = { token: string };
export type RedoRes = {};
export type Redo = ThunkAction<
  "REDO_REQUEST",
  "REDO_SUCCESS",
  "REDO_ERROR",
  UndoReq,
  UndoRes
>;

export const redo = dispatcher(Api.redo)<Redo>(
  asReq("REDO_REQUEST"),
  asRes("REDO_SUCCESS"),
  asErr("REDO_ERROR")
);

export type CreateDrawingReq = { name: string; token: string };
export type CreateDrawingRes = { drawing: Drawing };
export type CreateDrawing = ThunkAction<
  "CREATE_DRAWING_REQUEST",
  "CREATE_DRAWING_SUCCESS",
  "CREATE_DRAWING_ERROR",
  CreateDrawingReq,
  CreateDrawingRes
>;

export const createDrawing = dispatcher(Api.newDrawing)<CreateDrawing>(
  asReq("CREATE_DRAWING_REQUEST"),
  asRes("CREATE_DRAWING_SUCCESS"),
  asErr("CREATE_DRAWING_ERROR")
);

export type LoadDrawingReq = { id: ID; token: string };
export type LoadDrawingRes = { drawing: Drawing };
export type LoadDrawing = ThunkAction<
  "LOAD_DRAWING_REQUEST",
  "LOAD_DRAWING_SUCCESS",
  "LOAD_DRAWING_ERROR",
  LoadDrawingReq,
  LoadDrawingRes
>;

export const loadDrawing = dispatcher(Api.loadDrawing)<LoadDrawing>(
  asReq("LOAD_DRAWING_REQUEST"),
  asRes("LOAD_DRAWING_SUCCESS"),
  asErr("LOAD_DRAWING_ERROR")
);

export type SaveDrawingReq = { drawing: Drawing; token: string };
export type SaveDrawingRes = {};
export type SaveDrawing = ThunkAction<
  "SAVE_DRAWING_REQUEST",
  "SAVE_DRAWING_SUCCESS",
  "SAVE_DRAWING_ERROR",
  {},
  {}
>;

export const saveDrawing = dispatcher(Api.saveDrawing)<SaveDrawing>(
  asReq("SAVE_DRAWING_REQUEST"),
  asRes("SAVE_DRAWING_SUCCESS"),
  asErr("SAVE_DRAWING_ERROR")
);

export type AddPaintReq = { paint: Paint; token: string };
export type AddPaintRes = {};
export type AddPaint = ThunkAction<
  "ADD_PAINT_REQUEST",
  "ADD_PAINT_SUCCESS",
  "ADD_PAINT_ERROR",
  AddPaintReq,
  AddPaintRes
>;

export const addPaint = dispatcher(Api.addPaint)<AddPaint>(
  asReq("ADD_PAINT_REQUEST"),
  asRes("ADD_PAINT_SUCCESS"),
  asErr("ADD_PAINT_ERROR")
);

export type ModifyPaintReq = { token: string };
export type ModifyPaintRes = {};
export type ModifyPaint = ThunkAction<
  "MODIFY_PAINT_REQUEST",
  "MODIFY_PAINT_SUCCESS",
  "MODIFY_PAINT_ERROR",
  ModifyPaintReq,
  ModifyPaintRes
>;

export const modifyPaint = dispatcher(Api.modifyPaint)<ModifyPaint>(
  asReq("MODIFY_PAINT_REQUEST"),
  asRes("MODIFY_PAINT_SUCCESS"),
  asErr("MODIFY_PAINT_ERROR")
);

export type DeletePaintReq = { token: string };
export type DeletePaintRes = {};
export type DeletePaint = ThunkAction<
  "DELETE_PAINT_REQUEST",
  "DELETE_PAINT_SUCCESS",
  "DELETE_PAINT_ERROR",
  DeletePaintReq,
  DeletePaintRes
>;

export const deletePaint = dispatcher(Api.deletePaint)<DeletePaint>(
  asReq("DELETE_PAINT_REQUEST"),
  asRes("DELETE_PAINT_SUCCESS"),
  asErr("DELETE_PAINT_ERROR")
);
