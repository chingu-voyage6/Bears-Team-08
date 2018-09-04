import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as Router from "koa-router";

import * as Middleware from "../../middlewares";
import { UserController } from "./controller";
import { ServiceContainer } from "../../server";
import { Role } from "@shared/contract";

export function init(server: Koa, container: ServiceContainer) {
  const router = new Router({ prefix: "/api/v1/users" });
  const controller = new UserController(container.managers.user);

  router.get(
    "/me",
    Middleware.authentication(container.lib.authenticator),
    Middleware.authorization([Role.user, Role.admin]),
    controller.get
  );

  router.post("/", bodyParser(), controller.create);

  router.post("/login", bodyParser(), controller.login);

  router.put(
    "/",
    bodyParser(),
    Middleware.authentication(container.lib.authenticator),
    Middleware.authorization([Role.user, Role.admin]),
    controller.update
  );

  router.put(
    "/password",
    bodyParser(),
    Middleware.authentication(container.lib.authenticator),
    Middleware.authorization([Role.user, Role.admin]),
    controller.changePassword
  );

  router.delete(
    "/:id",
    Middleware.authentication(container.lib.authenticator),
    Middleware.authorization([Role.admin]),
    controller.delete
  );

  server.use(router.routes());
}
