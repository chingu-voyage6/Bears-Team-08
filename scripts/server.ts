/* tslint:disable:no-console */
import * as fs from "fs";
import * as Path from "path";

import * as Webpack from "webpack";
import * as Nodemon from "nodemon";
import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

import * as Paths from "../lib/paths";

const isProduction = process.env.NODE_ENV === "production";

const config: Webpack.Configuration = {
  target: "node",
  devtool: "inline-source-map",
  entry: Paths.appServerIndex,
  output: {
    filename: "server.js",
    path: Paths.appServerBuild
  },
  resolve: {
    extensions: [".js", ".json", ".ts"],
    plugins: [new TsconfigPathsPlugin({ configFile: Paths.appTsServerConfig })]
  },
  mode: isProduction ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      watch: Paths.appSrc,
      tsconfig: Paths.appTsServerConfig,
      tslint: Paths.appTsLint
    })
  ]
};

async function build(compiler: Webpack.Compiler): Promise<void> {
  compiler.run((err, stats) => {
    if (err) {
      console.log("Webpack error:", err);
    }
  });
}

async function watch(compiler: Webpack.Compiler): Promise<void> {
  const { path, filename } = compiler.options.output;
  const output = Path.resolve(path, filename);
  let running = false;

  const watching = compiler.watch({}, (err, stats) => {
    if (err) {
      console.log("Webpack error:", err);
    }
    if (running) {
      Nodemon.emit("restart");
      console.log("Restarting server!");
    } else {
      Nodemon({ script: output });
      running = true;
    }
  });

  ["SIGINT", "SIGTERM"].forEach(sig => {
    process.on(sig as any, () => {
      watching.close(() => {});
      Nodemon.emit("quit");
      process.exit();
    });
  });
}

enum Command {
  Build = "build",
  Watch = "watch"
}

async function init(): Promise<void> {
  const compiler = Webpack(config);
  const cmd = process.argv[2] || "build";
  switch (cmd) {
    case Command.Watch: {
      console.log("watching");
      await watch(compiler);
      break;
    }
    case Command.Build:
    default:
      console.log("building");
      await build(compiler);
      break;
  }
}

init().catch(e => {
  console.log("Error: ", e);
});
