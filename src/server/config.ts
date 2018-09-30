import * as Fs from "fs";
import * as Path from "path";

import { config as setEnvironment } from "dotenv";
import { debug } from "webpack";

import { Configuration } from "./lib/database";

setEnvironment();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

const appDirectory = Fs.realpathSync(process.cwd());

function resolveApp(relativePath: string): string {
  return Path.resolve(appDirectory, relativePath);
}

export const baseRoute: string = "/api";
export const indexFile: string = resolveApp("build/client/index.html");
export const isProduction: boolean = process.env.NODE_ENV === "production";
export const isTest: boolean = process.env.NODE_ENV === "testing";
export const isHttps: boolean = process.env.HTTPS === "true";
export const isDev: boolean = process.env.NODE_ENV === "development";
export const certFile: Buffer = Fs.readFileSync(process.env.API_CERT_FILE);
export const keyFile: Buffer = Fs.readFileSync(process.env.API_KEY_FILE);
export const port: number = parseInt(process.env.PORT, 10) || 8090;
if (isProduction && !process.env.SECRET_KEY) {
  throw new Error(
    "SECRET_KEY environmental variable required to be set in production mode"
  );
}
export const secretKey: string = process.env.SECRET_KEY || "secretKey";
export const staticFiles: string = resolveApp("build/client");
export const dbConfig: Configuration = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  user: process.env.DB_USER || "quick-draw",
  password: process.env.DB_PASS || "",
  database: `${process.env.DB_NAME || "quick-draw"}${isTest ? -test : ""}`,
  debug: process.env.DB_DEBUG === "true"
};
