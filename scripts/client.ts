/* tslint:disable:no-console */

import * as fs from "fs";
import * as path from "path";

import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as Webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";
import * as Dotenv from "dotenv";
import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

import * as Paths from "../lib/paths";

Dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const config: Webpack.Configuration = {
  target: "web",
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "cheap-module-source-map",
  entry: { bundle: Paths.appClientIndex },
  output: {
    filename: path.join(
      "static",
      "js",
      isProduction ? "[name].[hash].js" : "[name].js"
    ),
    chunkFilename: isProduction ? "[id].[hash].js" : "[id].js",
    path: Paths.appClientBuild
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
    plugins: [new TsconfigPathsPlugin({ configFile: Paths.appTsClientConfig })]
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
          {
            test: /\.(ts|tsx)$/,
            exclude: [/\.(spec|test).(ts|tsx)$/],
            use: [
              {
                loader: "ts-loader",
                options: {
                  // disable type checker - we will use it in fork plugin
                  transpileOnly: true
                }
              }
            ]
          },
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader", options: { importLoaders: 1 } },
              {
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  plugins: () => [require("autoprefixer")]
                }
              }
            ]
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve("file-loader"),
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: Paths.appHtml,
      favicon: Paths.appFavicon
    }),
    new ForkTsCheckerWebpackPlugin({
      watch: Paths.appSrc,
      tsconfig: Paths.appTsClientConfig,
      tslint: Paths.appTsLint
    }),
    new Webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
      PUBLIC_URL: process.env.PUBLIC_URL,
      SERVER_PORT: process.env.SERVER_PORT,
      API_URL: process.env.API_URL
    }),
    new Webpack.HotModuleReplacementPlugin()
  ],
  performance: {
    hints: isProduction ? false : "warning"
  }
};

async function build(): Promise<void> {
  const compiler = Webpack(config);
  compiler.run(() => {
    console.log("building");
  });
}

async function watch(): Promise<void> {
  const compiler = Webpack(config);
  const server = new WebpackDevServer(compiler, {
    host: "0.0.0.0",
    allowedHosts: ["localhost"],
    compress: true,
    https: {
      key: fs.readFileSync(Paths.keyFile),
      cert: fs.readFileSync(Paths.certFile)
    },
    hot: true
  });
  const port = parseInt(process.env.REACT_APP_PORT, 10) || 8080;
  server.listen(port, (err?: Error) => {
    console.log(`Listening on ${port}`);
  });
}

enum Command {
  Build = "build",
  Watch = "watch"
}

async function init(): Promise<void> {
  const cmd = process.argv[2] || "build";
  switch (cmd) {
    case Command.Watch: {
      console.log("Watching");
      await watch();
      break;
    }
    case Command.Build:
    default: {
      console.log("Building");
      await build();
      break;
    }
  }
}

init().catch(e => console.log(e));
