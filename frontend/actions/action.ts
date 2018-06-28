import { PaintKind } from "../shared/paint";
import { Drawing } from "../shared/drawing";
import { Paint } from "../shared/paint";

type Req<Kind> = { request: Kind };
type Res<Kind> = { response: Kind };
type Err = { error: string };

export type ThunkAction<ReqKind, ResKind, ErrKind, _Req, _Res> =
  | ({ type: ReqKind } & Req<_Req>)
  | ({ type: ResKind } & Req<_Req> & Res<_Res>)
  | ({ type: ErrKind } & Req<_Req> & Err);

export type ChangePaintMethod = {
  type: "CHANGE_PAINT_METHOD";
  method: PaintKind;
};

export type Undo = ThunkAction<
  "UNDO_REQUEST",
  "UNDO_SUCCESS",
  "UNDO_ERROR",
  {},
  {}
>;

export type Redo = ThunkAction<
  "REDO_REQUEST",
  "REDO_SUCCESS",
  "REDO_ERROR",
  {},
  {}
>;

export type Paint = { paint: Paint };

export type AddPaint = ThunkAction<
  "ADD_PAINT_REQUEST",
  "ADD_PAINT_SUCCESS",
  "ADD_PAINT_ERROR",
  {},
  {}
>;

export type UpdatePaint = ThunkAction<
  "UPDATE_PAINT_REQUEST",
  "UPDATE_PAINT_SUCCESS",
  "UPDATE_PAINT_ERROR",
  {},
  {}
>;

export type DeletePaint = ThunkAction<
  "DELETE_PAINT_REQUEST",
  "DELETE_PAINT_SUCCESS",
  "DELETE_PAINT_ERROR",
  {},
  {}
>;

export type Drawing = { drawing: Drawing };

export type LoadDrawing = ThunkAction<
  "LOAD_DRAWING_REQUEST",
  "LOAD_DRAWING_SUCCESS",
  "LOAD_DRAWING_ERROR",
  {},
  Drawing
>;

export type SaveDrawing = ThunkAction<
  "SAVE_DRAWING_REQUEST",
  "SAVE_DRAWING_SUCCESS",
  "SAVE_DRAWING_ERROR",
  Drawing,
  {}
>;

export type Action =
  | ChangePaintMethod
  | Redo
  | Undo
  | AddPaint
  | UpdatePaint
  | DeletePaint
  | LoadDrawing
  | SaveDrawing;

type ActionKind = Action["type"];

// TypeScript won't narrow a `ThunkAction` union directly, but
// we can help it out by tagging the three permutations.
export const asReq = <ReqKind extends ActionKind>(type: ReqKind) => <_Req>(
  request: _Req
) => ({
  type,
  request
});

export const asRes = <ResKind extends ActionKind>(type: ResKind) => <
  _Req,
  _Res
>(
  request: _Req,
  response: _Res
) => ({ type, request, response });

export const asErr = <ErrKind extends ActionKind>(type: ErrKind) => <_Req>(
  request: _Req,
  error: string
) => ({ type, request, error });

type Dispatch<A> = (a: A) => A;
type Thunk<Req, Res> = (request: Req) => Promise<Res>;

type ReqCreator<A, _Req> = (req: _Req) => A;
type ResCreator<A, _Req, _Res> = (req: _Req, res: _Res) => A;
type ErrCreator<A, _Req> = (req: _Req, err: string) => A;

export const dispatcher = <_Req, _Res>(fn: Thunk<_Req, _Res>) => <
  A extends Action
>(
  req: ReqCreator<A, _Req>,
  res: ResCreator<A, _Req, _Res>,
  err: ErrCreator<A, _Req>
) => (request: _Req) => (dispatch: Dispatch<A>) => {
  dispatch(req(request));
  fn(request)
    .then(response => dispatch(res(request, response)))
    .catch(err => dispatch(err(request, err.message)));
};
