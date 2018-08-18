import * as Path from "path";
import * as Fs from "fs";
import { config as setEnvironment } from "dotenv";

setEnvironment({ path: "./env" });

const appDirectory = Fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  Path.resolve(appDirectory, relativePath);

export const baseRoute: string = "/api";
export const indexFile: string = resolveApp("build/client/index.html");
export const isProduction: boolean = process.env.NODE_ENV === "production";
export const isTest: boolean = process.env.NODE_ENV === "test";
export const port: number = parseInt(process.env.PORT, 10) || 8090;
export const secretKey: string = process.env.SECRET_KEY;
export const staticFiles: string = resolveApp("build/client");
export const mongoURI: string =
  process.env.MONGO_URI || "mongodb://localhost:27017";
