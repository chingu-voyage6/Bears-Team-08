import {
  Action,
  SavePainting,
  LoadPainting,
  UndoLastPaint,
  ChangePaintMethod,
  dispatcher,
  asReq,
  asRes,
  asErr,
  AddPaintObject
} from "./action";

import * as Api from "../api";

export { Action };

export const undoLastPaint = () => Action => ({
  kind: "UNDO_LAST_PAINT"
});

export const redoLastPaint = () => Action => ({
  kind: "REDO_LAST_PAINT"
});

export const changePaintMethod = (method: ChangePaintMethod) => Action => ({
  kind: "CHANGE_PAINT_METHOD",
  method
});

export const loadPainting = dispatcher(Api.loadPainting)<LoadPainting>(
  asReq("LOAD_PAINTING_REQUEST"),
  asRes("LOAD_PAINTING_SUCCESS"),
  asErr("LOAD_PAINTING_ERROR")
);

export const savePainting = dispatcher(Api.savePainting)<SavePainting>(
  asReq("SAVE_PAINTING_REQUEST"),
  asRes("SAVE_PAINTING_SUCCESS"),
  asErr("SAVE_PAINTING_ERROR")
);

export const addPaintObject = dispatcher(Api.addPaintObject)<AddPaintObject>(
  asReq("ADD_PAINT_OBJECT_REQUEST"),
  asRes("ADD_PAINT_OBJECT_SUCCESS"),
  asErr("ADD_PAINT_OBJECT_ERROR")
);
