import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import * as bodyParser from "koa-bodyparser";
import { Server as WSServer } from "ws";

import * as Middleware from "../../middlewares";
import * as Validators from "./validators";

import { ModuleFn, Router } from "..";
import { Application } from "../../application";
import { DrawingController } from "./controller";
import { QueryKind } from "../../middlewares";

export function drawingRouter(controller: DrawingController): Router {
  const router = new KoaRouter({ prefix: "/api/v1/drawings" });

  router.get(
    "/",
    bodyParser(),
    Middleware.queryParser({
      limit: { kind: QueryKind.Number, default: 10 },
      offset: { kind: QueryKind.Number, default: 0 }
    }),
    controller.index
  );
  return router;
}

export function drawingModule(application: Application): ModuleFn {
  const wsServer = new WSServer({ noServer: true });
  const cntr = new DrawingController(application.managers.drawing, wsServer);
  const router = drawingRouter(cntr);
  return appServer => {
    appServer.server.on("upgrade", cntr.upgrade);
    appServer.app.use(router.routes());
  };
}
