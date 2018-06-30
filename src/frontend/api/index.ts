import { Drawing } from "../../shared/drawing";
import { Paint } from "../../shared/paint";
import {
  NewDrawingReq,
  NewDrawingRes,
  LoadDrawingReq,
  LoadDrawingRes
} from "../actions";

export const login = async (): Promise<any> => {
  return Promise.resolve(0);
};

export const newDrawing = async (
  req: NewDrawingReq
): Promise<NewDrawingRes> => {
  // axios("/api", { header: { AuthoSTuff: `Bearer ${user.token}` } });
  return Promise.resolve({ drawing: new Drawing(req.name) });
};

export const loadDrawing = async (
  req: LoadDrawingReq
): Promise<LoadDrawingRes> => {
  return Promise.resolve({ drawing: new Drawing("example name") });
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve(new Drawing())
  //   }, 500);
  // });
};

export const saveDrawing = async (drawing: Drawing): Promise<null> => {
  return Promise.resolve(null);
};

export const addPaint = async (paint: Paint): Promise<null> => {
  return Promise.resolve(null);
};

export const updatePaint = async (req: {
  index: number;
  fn: (paint: Paint) => Paint;
}): Promise<null> => {
  return Promise.resolve(null);
};

export const deletePaint = async (id: number): Promise<null> => {
  return Promise.resolve(null);
};

export const redo = async (): Promise<null> => {
  return;
};

export const undo = async (): Promise<null> => {
  return;
};
