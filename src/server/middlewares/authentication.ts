import { Context } from "koa";
import { IMiddleware } from "koa-router";
import { Authenticator } from "../lib/authentication";

export function authentication(authenticator: Authenticator): IMiddleware {
  return async (ctx, next) => {
    const authHeader: string = ctx.headers.authorization;
    const token = authHeader.substr("Bearer ".length, authHeader.length);
    const user = await authenticator.validate(token);

    ctx.state.user = user;
    await next();
  };
}
