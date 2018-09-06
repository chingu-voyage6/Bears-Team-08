import * as Koa from "koa";
import { Application } from "../application";

export type Component = (server: Koa) => Koa;

export * from "./users";
export * from "./drawings";
