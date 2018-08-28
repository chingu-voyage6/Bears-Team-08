import { Context } from "koa";

export async function responseTime(ctx, next: () => Promise<any>) {
  const start = Date.now();

  await next();

  ctx.set("X-Response-Time", (Date.now() - start).toString());
}
