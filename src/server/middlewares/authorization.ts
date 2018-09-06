import { Context } from "koa";

import { Middleware } from ".";
import { ForbiddenError } from "../errors";
import { User, Role } from "../entities";

export function authorization(roles: Role[]): Middleware {
  return async (ctx, next) => {
    const user: User = ctx.state.user;

    if (roles.indexOf(user.role) < 0) {
      throw new ForbiddenError();
    }

    await next();
  };
}
