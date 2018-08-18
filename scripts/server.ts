/* tslint:disable:no-console */
import * as fs from "fs";
import * as Path from "path";

import * as Webpack from "webpack";
import * as Nodemon from "nodemon";
import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

import * as Paths from "../config/paths";

const cmd = process.argv[2] || "build";
const isProduction = process.env.NODE_ENV === "production";

const config: Webpack.Configuration = {
  target: "node",
  devtool: false,
  entry: { server: Paths.appServerIndex },
  output: {
    filename: "main.js",
    path: Paths.appServerBuild
  },
  resolve: {
    extensions: [".js", ".json", ".ts"],
    plugins: [new TsconfigPathsPlugin({ configFile: Paths.appTsServerConfig })]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/\.(spec|test).(ts|tsx)$/],
        use: [
          {
            loader: require.resolve("ts-loader"),
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
      async: true,
      watch: Paths.appSrc,
      tsconfig: Paths.appTsServerConfig,
      tslint: Paths.appTsLint
    })
  ]
};

const init = async (): Promise<void> => {
  const compiler = Webpack(config);
  if (cmd === "build") {
    compiler.run(() => {
      console.log("building");
    });
  } else if (cmd === "watch") {
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
  } else {
    console.log("Please run either `yarn server build` or `yarn server watch`");
  }
};

init();
