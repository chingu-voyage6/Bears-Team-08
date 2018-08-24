import * as Path from "path";
import * as Fs from "fs";
import { config as setEnvironment } from "dotenv";
import { Configuration } from "../lib/database";
import { debug } from "webpack";

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

setEnvironment();

const appDirectory = Fs.realpathSync(process.cwd());

function resolveApp(relativePath: string): string {
  return Path.resolve(appDirectory, relativePath);
}

export const baseRoute: string = "/api";
export const indexFile: string = resolveApp("build/client/index.html");
export const isProduction: boolean = process.env.NODE_ENV === "production";
export const isTest: boolean = process.env.NODE_ENV === "testing";
export const isDev: boolean = process.env.NODE_ENV === "development";
export const port: number = parseInt(process.env.PORT, 10) || 8090;
export const secretKey: string = process.env.SECRET_KEY;
export const staticFiles: string = resolveApp("build/client");
export const dbConfig: Configuration = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  user: process.env.DB_USER || "quick-draw",
  password: process.env.DB_PASS || "",
  database: getDatabaseName(),
  debug: !isProduction
};

function getDatabaseName(): string {
  const dbName = process.env.DB_NAME || "quick-draw";
  if (isProduction) {
    return dbName;
  } else if (isDev) {
    return dbName + "-dev";
  } else if (isTest) {
    return dbName + "-test";
  }
}
