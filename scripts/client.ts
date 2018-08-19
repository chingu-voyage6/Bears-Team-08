/* tslint:disable:no-console */

import * as fs from "fs";
import * as path from "path";

import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as Webpack from "webpack";
import * as WebpackServe from "webpack-serve";
import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

import * as Paths from "../src/lib/paths";

const cmd = process.argv[2] || "build";
const isProduction = process.env.NODE_ENV === "production";
process.env.WEBPACK_SERVE = process.env.NODE_ENV;

const config: Webpack.Configuration = {
  target: "web",
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "cheap-module-source-map",
  entry: { main: Paths.appClientIndex },
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
              {
                loader: isProduction
                  ? (MiniCssExtractPlugin.loader as any)
                  : "style-loader"
              },
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
      async: true,
      watch: Paths.appSrc,
      tsconfig: Paths.appTsClientConfig,
      tslint: Paths.appTsLint
    })
  ],
  performance: {
    hints: isProduction ? false : "warning"
  }
};

const init = async (): Promise<void> => {
  if (cmd === "build") {
    const compiler = Webpack(config);
    compiler.run(() => {
      console.log("building");
    });
  } else if (cmd === "watch") {
    // const proxy = Express();
    const res = await WebpackServe({}, { config, clipboard: true });
  } else {
    console.log("Please run either `yarn client build` or `yarn client watch`");
  }
};

init();
