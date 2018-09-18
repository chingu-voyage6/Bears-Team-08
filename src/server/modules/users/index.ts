import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import * as bodyParser from "koa-bodyparser";

import * as Middleware from "../../middlewares";
import * as Validators from "./validators";
import { ModuleFn, Router } from "..";
import { Application } from "../../application";
import { Authenticator } from "../../lib/authentication";
import { Role } from "@shared/contract";
import { UserController } from "./controller";

export function userRouter(
  controller: UserController,
  authenticator: Authenticator
): Router {
  const router = new KoaRouter({ prefix: "/api/v1/users" });

  router.get("/", bodyParser(), controller.index);
  router.post(
    "/",
    bodyParser(),
    Middleware.validator("Unable to create user", {
      request: { body: Validators.createUser }
    }),
    controller.create
  );
  router.patch(
    "/",
    bodyParser(),
    Middleware.authentication(authenticator),
    Middleware.authorization([Role.user, Role.admin]),
    controller.update
  );

  router.get("/:id", bodyParser(), controller.create);
  router.delete(
    "/:id",
    Middleware.authentication(authenticator),
    Middleware.authorization([Role.admin]),
    controller.delete
  );

  router.post("/login", bodyParser(), controller.login);

  router.get(
    "/me",
    Middleware.authentication(authenticator),
    Middleware.authorization([Role.user, Role.admin]),
    controller.me
  );

  router.put(
    "/password",
    bodyParser(),
    Middleware.authentication(authenticator),
    Middleware.authorization([Role.user, Role.admin]),
    controller.changePassword
  );

  return router;
}

export function userModule(application: Application): ModuleFn {
  const controller = new UserController(application.managers.user);
  const router = userRouter(controller, application.lib.authenticator);
  return server => server.use(router.routes());
}
