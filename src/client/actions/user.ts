import { AuthUserJSON, LoginUserJSON } from "@shared/contract";

import { Action, asErr, asReq, asRes, dispatcher, ThunkAction } from "./action";
import * as Api from "../api";

export type LoginUserReq = LoginUserJSON;
export type LoginUserRes = AuthUserJSON;
export type LoginUser = ThunkAction<
  "LOGIN_USER_REQUEST",
  "LOGIN_USER_SUCCESS",
  "LOGIN_USER_ERROR",
  LoginUserReq,
  LoginUserRes
>;

export const loginUser = dispatcher(Api.loginUser)<LoginUser>(
  asReq("LOGIN_USER_REQUEST"),
  asRes("LOGIN_USER_SUCCESS"),
  asErr("LOGIN_USER_ERROR")
);

export type LogoutUser = {
  type: "LOGOUT_USER";
};

export const logoutUser = (): Action => ({
  type: "LOGOUT_USER"
});
