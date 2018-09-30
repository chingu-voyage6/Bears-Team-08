import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import { Application } from "../application";
import { AppServer } from "../server";

export type ModuleFn = (server: AppServer) => void;
export type Router = KoaRouter;

export { userModule } from "./users";
export { drawingModule } from "./drawings";
