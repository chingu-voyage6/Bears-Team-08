import * as Api from "../api";
import {
  Action,
  AddPaint,
  AddPaintReq,
  AddPaintRes,
  DeletePaint,
  DeletePaintReq,
  DeletePaintRes,
  LoadDrawing,
  LoadDrawingReq,
  LoadDrawingRes,
  ModifyPaint,
  ModifyPaintReq,
  ModifyPaintRes,
  NewDrawing,
  NewDrawingReq,
  NewDrawingRes,
  Redo,
  RedoReq,
  RedoRes,
  SaveDrawing,
  SaveDrawingReq,
  SaveDrawingRes,
  Undo,
  UndoReq,
  UndoRes,
  asErr,
  asReq,
  asRes,
  dispatcher
} from "../actions/action";

import { PaintKind } from "@shared/paint";

export {
  Action,
  AddPaintReq,
  AddPaintRes,
  DeletePaintReq,
  DeletePaintRes,
  LoadDrawingReq,
  LoadDrawingRes,
  ModifyPaintReq,
  ModifyPaintRes,
  NewDrawingReq,
  NewDrawingRes,
  RedoReq,
  RedoRes,
  SaveDrawingReq,
  SaveDrawingRes,
  UndoReq,
  UndoRes
};

export const changePaintMethod = (method: PaintKind): Action => ({
  type: "CHANGE_PAINT_METHOD",
  method
});

export const undo = dispatcher(Api.undo)<Undo>(
  asReq("UNDO_REQUEST"),
  asRes("UNDO_SUCCESS"),
  asErr("UNDO_ERROR")
);

export const redo = dispatcher(Api.redo)<Redo>(
  asReq("REDO_REQUEST"),
  asRes("REDO_SUCCESS"),
  asErr("REDO_ERROR")
);

export const newDrawing = dispatcher(Api.newDrawing)<NewDrawing>(
  asReq("NEW_DRAWING_REQUEST"),
  asRes("NEW_DRAWING_SUCCESS"),
  asErr("NEW_DRAWING_ERROR")
);

export const loadDrawing = dispatcher(Api.loadDrawing)<LoadDrawing>(
  asReq("LOAD_DRAWING_REQUEST"),
  asRes("LOAD_DRAWING_SUCCESS"),
  asErr("LOAD_DRAWING_ERROR")
);

export const saveDrawing = dispatcher(Api.saveDrawing)<SaveDrawing>(
  asReq("SAVE_DRAWING_REQUEST"),
  asRes("SAVE_DRAWING_SUCCESS"),
  asErr("SAVE_DRAWING_ERROR")
);

export const addPaint = dispatcher(Api.addPaint)<AddPaint>(
  asReq("ADD_PAINT_REQUEST"),
  asRes("ADD_PAINT_SUCCESS"),
  asErr("ADD_PAINT_ERROR")
);

export const updatePaint = dispatcher(Api.updatePaint)<ModifyPaint>(
  asReq("MODIFY_PAINT_REQUEST"),
  asRes("MODIFY_PAINT_SUCCESS"),
  asErr("MODIFY_PAINT_ERROR")
);

export const deletePaint = dispatcher(Api.deletePaint)<DeletePaint>(
  asReq("DELETE_PAINT_REQUEST"),
  asRes("DELETE_PAINT_SUCCESS"),
  asErr("DELETE_PAINT_ERROR")
);
