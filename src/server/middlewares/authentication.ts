import { Context } from "koa";
import { IMiddleware } from "koa-router";
import { Authenticator } from "../lib/authentication";
import { UnauthorizedError, NotFoundError } from "../errors";

export function authentication(authenticator: Authenticator): IMiddleware {
  const bearerLength = "Bearer ".length;

  return async (ctx, next) => {
    if (ctx.headers.authorization) {
      const authHeader: string = ctx.headers.authorization;
      const token = authHeader.substring(bearerLength, authHeader.length);
      const user = await authenticator.validate(token);

      ctx.state.user = user;
      next();
    } else {
      throw new UnauthorizedError(
        new NotFoundError(`Authorization token not found`)
      );
    }
  };
}
