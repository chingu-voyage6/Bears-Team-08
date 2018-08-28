import { Context } from "koa";
import { IMiddleware } from "koa-router";
import { Logger } from "pino";
import { AppError, ErrorKind } from "../errors";

function toHTTPCode(kind: ErrorKind) {
  switch (kind) {
    case ErrorKind.Internal:
      return 500;
    case ErrorKind.NotFound:
      return 404;
    case ErrorKind.Validation:
    case ErrorKind.FieldValidation:
      return 400;
    case ErrorKind.Unauthorized:
      return 401;
    case ErrorKind.Permission:
      return 403;
    case ErrorKind.Permission:
      return 400;
  }
}

export function errorHandler(logger: Logger): IMiddleware {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err) {
      const code = toHTTPCode(err.code);
      logger.error("Error Handler:", err);

      if (err instanceof AppError) {
        ctx.body = err.toModel();
        ctx.status = code ? code : 500;
      } else {
        ctx.body = new AppError(ErrorKind.Internal, "Internal Error Server");
        ctx.status = 500;
      }
    }
  };
}
