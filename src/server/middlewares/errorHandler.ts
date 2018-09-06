import { Context } from "koa";
import { IMiddleware } from "koa-router";
import { Logger } from "pino";
import { AppError, ErrorKind } from "../errors";

export function errorHandler(logger: Logger): IMiddleware {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      const code = err.code;
      logger.error("Error Handler:", err);

      if (err instanceof AppError) {
        ctx.body = err.toModel();
        ctx.status = code ? code : 500;
      } else {
        ctx.body = new AppError(
          ErrorKind.Internal,
          "Internal Server Error"
        ).toModel();
        ctx.status = 500;
      }
    }
  };
}
