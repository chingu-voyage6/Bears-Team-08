import * as Path from "path";
import * as Fs from "fs";
import * as Url from "url";

const appDirectory = Fs.realpathSync(process.cwd());
const resolveApp = relativePath => Path.resolve(appDirectory, relativePath);

const env = process.env;
export const isProduction = env.NODE_ENV === "production";
export const isTest: boolean = env.NODE_ENV === "test";
export const port = env.PORT || 3001;
export const baseRoute = "/api";
export const staticFiles = resolveApp("build");
export const indexFile = resolveApp("build/index.html");

const getSecretKey = key => {
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
