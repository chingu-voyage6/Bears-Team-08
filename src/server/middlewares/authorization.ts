import { Context } from "koa";
import { IMiddleware } from "koa-router";

import { PermissionError } from "../errors";
import { AuthUserJSON, Role } from "@shared/contract";

export function authorization(roles: Role[]): IMiddleware {
  return async (ctx, next) => {
    const user: AuthUserJSON = ctx.state.user;

    if (roles.indexOf(user.role) < 0) {
      throw new PermissionError();
    }

    await next();
  };
}
