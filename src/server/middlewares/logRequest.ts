import { Context } from "koa";
import { IMiddleware } from "koa-router";
import { Logger } from "pino";

export function logRequest(logger: Logger): IMiddleware {
  return async (ctx, next) => {
    const start = Date.now();

    await next();

    const message = `[${ctx.status}] ${ctx.method} ${ctx.path}`;
    const logData: any = {
      method: ctx.method,
      path: ctx.path,
      ip: ctx.ip,
      statusCode: ctx.status,
      timeMs: Date.now() - start
    };

    if (ctx.status >= 400) {
      logger.error(message, logData, { body: ctx.body });
    } else {
      logger.info(message, logData);
    }
  };
}
