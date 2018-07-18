"use strict";

const Chalk = require("chalk");
const Path = require("path");
const nodemon = require("nodemon");
const webpack = require("webpack");
const webpackServe = require("webpack-serve");

process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

const Paths = require("../config/paths");
const clientConfig = require("../config/webpack.config.dev");
const serverConfig = require("../config/webpack.config.server");
const { getClientEnvironment, getServerEnvironment } = require("../config/env");

process.on("unhandledRejection", err => {
  throw err;
});

const serverEnv = getServerEnvironment();
const clientEnv = getClientEnvironment(Paths.publicUrl);

const isInteractive = process.stdout.isTTY;

const serverJs = (() => {
  const { filename, path } = serverConfig.output;
  return Path.join(path, filename);
})();
const clientPort = clientEnv.REACT_APP_PORT;
const serverPort = serverEnv.SERVER_PORT;

const start = async () => {
  const client = clientDevServer(clientConfig, clientPort, serverPort);
  const server = serverDevServer(serverConfig, serverPort);

  ["exit", "SIGINT", "SIGTERM"].forEach(sig => {
    process.on(sig, () => {
      Promise.all([client, server]).then(daemons => {
        daemons[0].app.stop();
        daemons[1]();
        process.exit(0);
      });
    });
  });
  return client;
};

const clientDevServer = async (config, port, proxy) => {
  const serve = webpackServe({}, { config, port });
  serve.then(server => {
    server.on("listening", (server, options) => {});
    server.on("build-started", compiler => {});
    server.on("build-finished", (compiler, stats) => {});
    server.on("compiler-warning", (compiler, stats) => {});
    server.on("compiler-error", (compiler, stats) => {});
  });
  return serve;
};

const serverDevServer = async (config, port) => {
  const compiler = webpack(config);
  nodemon({ script: serverJs });

  return new Promise((resolve, reject) => {
    const watching = compiler.watch({}, async (err, stats) => {
      if (err) {
        return reject(err);
      }
      nodemon.emit("restart");
    });
    resolve({
      stop: () => {
        watching.close();
        nodemon.emit("quit");
      }
    });
    return watching;
  });
};

start();
