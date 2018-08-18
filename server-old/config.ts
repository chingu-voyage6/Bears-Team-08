/// This file should contain code that never changes after initial startup

import * as Path from "path";
import * as Fs from "fs";
import * as Url from "url";
import { config as setEnvironment} from "dotenv"

setEnvironment()

const appDirectory = Fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  Path.resolve(appDirectory, relativePath);

const env = process.env;
export const isProduction = env.NODE_ENV === "production";
export const isTest: boolean = env.NODE_ENV === "test";
export const port = env.PORT || 8090;
export const baseRoute = "/api";
export const staticFiles = resolveApp("build/client");
export const indexFile = resolveApp("build/client/index.html");

const getSecretKey = (key: string) => {
  if (isProduction && !key) {
    if (!key) {
      throw new Error("Secret key needs to be set for production");
    } else {
      return key;
    }
  } else if (isTest) {
    return "test secret key";
  } else {
    return "develop secret key";
  }
};

export const secretKey: string = getSecretKey(process.env.SECRET_KEY);
