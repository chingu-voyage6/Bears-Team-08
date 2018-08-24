"use strict";

import * as path from "path";
import * as fs from "fs";
import * as url from "url";

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());

function resolveApp(relativePath: string): string {
  return path.resolve(appDirectory, relativePath);
}

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith("/");
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");
  return ensureSlash(servedUrl, true);
}

export const appBuildDir = resolveApp("build");
export const appClientBuild = resolveApp("build/client");
export const appClientIndex = resolveApp("src/client/index.tsx");
export const appFavicon = resolveApp("src/public/favicon.ico");
export const appHtml = resolveApp("src/public/index.html");
export const appManifest = resolveApp("src/public/manifest.json");
export const appNodeModules = resolveApp("node_modules");
export const appPackageJson = resolveApp("package.json");
export const appPublic = resolveApp("src/public");
export const appServerBuild = resolveApp("build/server");
export const appServerIndex = resolveApp("src/server/index.ts");
export const appSrc = resolveApp("src");
export const appTsClientConfig = resolveApp("config/tsconfig.client.json");
export const appTsLint = resolveApp("tslint.json");
export const appTsServerConfig = resolveApp("config/tsconfig.server.json");
export const appTsTestConfig = resolveApp("config/tsconfig.test.json");
export const dotenv = resolveApp("../env");
export const publicUrl = getPublicUrl(resolveApp("package.json"));
export const servedPath = getServedPath(resolveApp("package.json"));
export const yarnLockFile = resolveApp("yarn.lock");
