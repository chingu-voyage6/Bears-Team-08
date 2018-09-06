import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as Router from "koa-router";

import * as Middleware from "../../middlewares";
import { UserController } from "./controller";
import { Application } from "../../application";
import { Role } from "@shared/contract";
import { Component } from "..";

export function userComponent(application: Application): Component {
  const router = new Router({ prefix: "/api/v1/users" });
  const controller = new UserController(application.managers.user);

  // router.get("/", bodyParser(), controller.)

  router.post("/", bodyParser(), controller.create);

  router.put(
    "/",
    bodyParser(),
    Middleware.authentication(application.lib.authenticator),
    Middleware.authorization([Role.user, Role.admin]),
    controller.update
  );

  router.post("/login", bodyParser(), controller.login);

  router.get(
    "/me",
    Middleware.authentication(application.lib.authenticator),
    Middleware.authorization([Role.user, Role.admin]),
    controller.get
  );

  router.put(
    "/password",
    bodyParser(),
    Middleware.authentication(application.lib.authenticator),
    Middleware.authorization([Role.user, Role.admin]),
    controller.changePassword
  );

  router.delete(
    "/:id",
    Middleware.authentication(application.lib.authenticator),
    Middleware.authorization([Role.admin]),
    controller.delete
  );

  return server => server.use(router.routes());
}
