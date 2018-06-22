import { type } from "os";

type Req<Kind> = { request: Kind };
type Res<Kind> = { response: Kind };
type Err = { error: string };

type ThunkAction<ReqKind, ResKind, ErrKind, _Req, _Res> =
  | ({ kind: ReqKind } & Req<_Req>)
  | ({ kind: ResKind } & Req<_Req> & Res<_Res>)
  | ({ kind: ErrKind } & Req<_Req> & Err);

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

export type UndoLastPaint = ThunkAction<
  "UNDO_REQUEST",
  "UNDO_SUCCESS",
  "UNDO_ERROR",
  {},
  {}
>;

export type RedoLastPaint = ThunkAction<
  "REDO_REQUEST",
  "REDO_SUCCESS",
  "REDO_ERROR",
  {},
  {}
>;

export type ChangePaintMethod = {
  kind: "CHANGE_PAINT_METHOD";
  method: string;
};

export type Action =
  | LoadPainting
  | AddPaintObject
  | SavePainting
  | UndoLastPaint
  | RedoLastPaint
  | ChangePaintMethod;

type ActionKind = Action["kind"];

// TypeScript won't narrow a `ThunkAction` union directly, but
// we can help it out by tagging the three permutations.
export const asReq = <ReqKind extends ActionKind>(kind: ReqKind) => <_Req>(
  request: _Req
) => ({
  kind,
  request
});

export const asRes = <ResKind extends ActionKind>(kind: ResKind) => <
  _Req,
  _Res
>(
  request: _Req,
  response: _Res
) => ({ kind, request, response });

export const asErr = <ErrKind extends ActionKind>(kind: ErrKind) => <_Req>(
  request: _Req,
  error: string
) => ({ kind, request, error });

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
