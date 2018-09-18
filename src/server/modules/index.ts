import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import { Application } from "../application";

export type ModuleFn = (server: Koa) => Koa;
export type Router = KoaRouter;

export * from "./users";
export * from "./drawings";
