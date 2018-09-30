import { Context } from "koa";

import { Middleware } from ".";
import { ForbiddenError } from "../errors";
import { User, RoleKind } from "../entities";

export function authorization(roles: RoleKind[]): Middleware {
  return async (ctx, next) => {
    const user: User = ctx.state.user;

    if (roles.indexOf(user.role) < 0) {
      throw new ForbiddenError();
    }

    await next();
  };
}
