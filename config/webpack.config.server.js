"use strict";

const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const path = require("path");
const webpack = require("webpack");

const { getServerEnvironment } = require("./env");
const paths = require("./paths");

const env = getServerEnvironment();

module.exports = {
  entry: [paths.appServerIndexTs],
  target: "node",
  devtool: "cheap-module-source-map",
  output: {
    pathinfo: true,
    filename: "server.js",
    path: paths.appServerBuild,
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },
  resolve: {
    // // This allows you to set a fallback for where Webpack should look for modules.
    // // We placed these paths second because we want `node_modules` to "win"
    // // if there are any conflicts. This matches Node resolution mechanism.
    // // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ["node_modules", paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // modulesDirectories: [paths.appNodeModules],
    extensions: [".js", ".json", ".ts"],
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
      new TsconfigPathsPlugin({ configFile: paths.appTsServerConfig })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve("source-map-loader"),
        enforce: "pre",
        include: paths.appSrc
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]"
            }
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve("babel-loader"),
            options: {
              compact: true
            }
          },

          // Compile .tsx?
          {
            test: /\.(ts|tsx)$/,
            include: paths.appSrc,
            use: [
              {
                loader: require.resolve("ts-loader"),
                options: {
                  // disable type checker - we will use it in fork plugin
                  transpileOnly: true,
                  configFile: paths.appTsServerConfig
                }
              }
            ]
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          {
            test: /\.css$/,
            use: [
              require.resolve("style-loader"),
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: require.resolve("postcss-loader"),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: "postcss",
                  plugins: () => [
                    require("postcss-flexbugs-fixes"),
                    autoprefixer({
                      browsers: [
                        ">1%",
                        "last 4 versions",
                        "Firefox ESR",
                        "not ie < 9" // React doesn't support IE8 anyway
                      ],
                      flexbox: "no-2009"
                    })
                  ]
                }
              }
            ]
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
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
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: paths.appSrc,
      tsconfig: paths.appTsFrontendConfig,
      tslint: paths.appTsLint
    })
  ],
  performance: {
    hints: false
  }
};
