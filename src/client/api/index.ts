import Axios, { AxiosRequestConfig } from "axios";

import { Drawing } from "@shared/drawing";
import { Paint } from "@shared/paint";

import {
  CreateDrawingReq,
  CreateDrawingRes,
  LoadDrawingReq,
  LoadDrawingRes,
  LoginUserReq,
  LoginUserRes,
  SaveDrawingRes,
  SaveDrawingReq,
  AddPaintReq,
  AddPaintRes,
  ModifyPaintReq,
  ModifyPaintRes,
  DeletePaintReq,
  DeletePaintRes,
  RedoReq,
  RedoRes,
  UndoReq,
  UndoRes,
  GetDrawingsReq,
  GetDrawingsRes
} from "../actions";

const apiUrl = process.env.API_URL;

export const loginUser = async (req: LoginUserReq): Promise<LoginUserRes> => {
  return Axios({
    url: "https://localhost:8090/api/v1/users",
    method: "post",
    data: {
      username: req.username,
      password: req.password
    }
  }).then(res => {
    return res.data as LoginUserRes;
  });
};

export const getDrawings = async (
  req: GetDrawingsReq
): Promise<GetDrawingsRes> => {
  const opts: AxiosRequestConfig = {};
  opts.url = `${apiUrl}/drawings`;
  opts.method = "GET";
  opts.data = { limit: req.limit, offset: req.offset };
  if (req.token) {
    opts.headers = { Authorization: `Bearer ${req.token}` };
  }
  return Axios(opts).then(res => res.data as GetDrawingsRes);
};

// Placeholders
export const newDrawing = async (
  req: CreateDrawingReq
): Promise<CreateDrawingRes> => {
  // axios("/api", { header: { AuthoSTuff: `Bearer ${user.token}` } });
  return new Promise(resolve => setTimeout(resolve, 5000)).then(() => {
    // console.log("resolved");
    return Promise.resolve({ drawing: new Drawing(`Resolved ${req.name}`) });
  });
  // return Promise.resolve({ drawing: new Drawing(req.name) });
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

export const saveDrawing = async (
  res: SaveDrawingRes
): Promise<SaveDrawingReq> => {
  return Promise.resolve(null);
};

export const addPaint = async (res: AddPaintReq): Promise<AddPaintRes> => {
  return Promise.resolve(null);
};

export const modifyPaint = async (
  req: ModifyPaintReq
): Promise<ModifyPaintRes> => {
  return Promise.resolve(null);
};

export const deletePaint = async (
  req: DeletePaintReq
): Promise<DeletePaintRes> => {
  return Promise.resolve(null);
};

export const redo = async (req: RedoReq): Promise<RedoRes> => {
  return;
};

export const undo = async (req: UndoReq): Promise<UndoRes> => {
  return;
};
