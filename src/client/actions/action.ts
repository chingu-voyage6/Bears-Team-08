type Req<T> = { request: T };
type Res<T> = { response: T };
type Err = { error: string };

import * as Drawing from "./drawing";
import * as User from "./user";

export type ThunkAction<ReqKind, ResKind, ErrKind, _Req, _Res> =
  | ({ type: ReqKind } & Req<_Req>)
  | ({ type: ResKind } & Req<_Req> & Res<_Res>)
  | ({ type: ErrKind } & Req<_Req> & Err);

export type Action =
  | Drawing.AddPaint
  | Drawing.ChangePaintMethod
  | Drawing.DeletePaint
  | Drawing.GetDrawings
  | Drawing.LoadDrawing
  | Drawing.ModifyPaint
  | Drawing.CreateDrawing
  | Drawing.Redo
  | Drawing.SaveDrawing
  | Drawing.Undo
  | User.LoginUser
  | User.LogoutUser;

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
type Resolve<_Req, _Res> = (request: _Req) => Promise<_Res>;

type ReqCreator<A, _Req> = (req: _Req) => A;
type ResCreator<A, _Req, _Res> = (req: _Req, res: _Res) => A;
type ErrCreator<A, _Req> = (req: _Req, err: string) => A;

export const dispatcher = <_Req, _Res>(fn: Resolve<_Req, _Res>) => <
  A extends Action
>(
  req: ReqCreator<A, _Req>,
  res: ResCreator<A, _Req, _Res>,
  err: ErrCreator<A, _Req>
) => (request: _Req) => (dispatch: Dispatch<A>) => {
  dispatch(req(request));
  fn(request)
    .then(response => dispatch(res(request, response)))
    .catch(e => dispatch(err(request, e.message)));
};
