import { PaintObjectKind } from "../shared/paintObject";

type Req<Kind> = { request: Kind };
type Res<Kind> = { response: Kind };
type Err = { error: string };

type ThunkAction<ReqKind, ResKind, ErrKind, _Req, _Res> =
  | ({ type: ReqKind } & Req<_Req>)
  | ({ type: ResKind } & Req<_Req> & Res<_Res>)
  | ({ type: ErrKind } & Req<_Req> & Err);

export type Painting = { painting: any };

export type LoadPainting = ThunkAction<
  "LOAD_PAINTING_REQUEST",
  "LOAD_PAINTING_SUCCESS",
  "LOAD_PAINTING_ERROR",
  {},
  Painting
>;

export type SavePainting = ThunkAction<
  "SAVE_PAINTING_REQUEST",
  "SAVE_PAINTING_SUCCESS",
  "SAVE_PAINTING_ERROR",
  Painting,
  {}
>;

export type AddPaintObject = ThunkAction<
  "ADD_PAINT_OBJECT_REQUEST",
  "ADD_PAINT_OBJECT_SUCCESS",
  "ADD_PAINT_OBJECT_ERROR",
  {},
  {}
>;

export type Undo = { type: "UNDO" };

export type Redo = { type: "REDO" };

export type RedoLastPaint = ThunkAction<
  "REDO_REQUEST",
  "REDO_SUCCESS",
  "REDO_ERROR",
  {},
  {}
>;

export type ChangePaintMethod = {
  type: "CHANGE_PAINT_METHOD";
  method: PaintObjectKind;
};

export type Action =
  | AddPaintObject
  | ChangePaintMethod
  | LoadPainting
  | Redo
  | SavePainting
  | Undo;

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
