// "use strict";

// // Do this as the first thing so that any code reading it knows the right env.
// process.env.BABEL_ENV = "development";
// process.env.NODE_ENV = "development";

// // Makes the script crash on unhandled rejections instead of silently
// // ignoring them. In the future, promise rejections that are not handled will
// // terminate the Node.js process with a non-zero exit code.
// process.on("unhandledRejection", err => {
//   throw err;
// });

// const nodemon = require("nodemon");
// const Path = require("path");
// const webpack = require("webpack");

// const config = require("../config/webpack.config.server");
// const { getServerEnvironment } = require("../config/env");
// const paths = require("../config/paths");

// const isInteractive = process.stdout.isTTY;

// const start = async () => {
//   const env = getServerEnvironment();

//   const { filename, path } = config.output;
//   const indexJs = Path.join(path, filename);

//   const compiler = webpack(config);
//   const watching = compiler.watch({}, (err, stats) => {
//     nodemon.emit("restart");
//     console.log("Restarting Server");
//   });

//   nodemon({ script: indexJs });
//   // return new Promise((resolve, reject) => {
//   //   const watching = compiler.watch({}, async (err, stats) => {
//   //     if (err) {
//   //       return reject(err);
//   //     }
//   //     const messages = formatWebpackMessages(stats.toJson({}, true));
//   //     if (messages.errors.length) {
//   //       // Only keep the first error. Others are often indicative
//   //       // of the same problem, but confuse the reader with noise.
//   //       if (messages.errors.length > 1) {
//   //         messages.errors.length = 1;
//   //       }
//   //       return reject(new Error(messages.errors.join("\n\n")));
//   //     }

//   //     // if (isInteractive) {
//   //     //   clearConsole();
//   //     // }
//   //     console.log("Restarting Server");

//   //     nodemon.emit("restart");

//   //     return {
//   //       stats,
//   //       warnings: messages.warnings
//   //     };
//   //   });

//   ["SIGINT", "SIGTERM"].forEach(sig => {
//     process.on(sig, () => {
//       watching.close();
//       nodemon.emit("quit");
//       process.exit();
//     });
//   });
//   // });
// };

// start();
