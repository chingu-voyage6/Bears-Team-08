import * as Path from "path";
import * as Fs from "fs";
import * as Url from "url";

const appDirectory = Fs.realpathSync(process.cwd());
const resolveApp = relativePath => Path.resolve(appDirectory, relativePath);

const env = process.env;
export const isProduction = env.NODE_ENV === "production";
export const port = env.PORT || 3001;
export const baseRoute = "/api";
export const staticFiles = resolveApp("build");
export const indexFile = resolveApp("build/index.html");
