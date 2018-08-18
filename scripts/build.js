// "use strict";

// const chalk = require("chalk");
// const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
// const fs = require("fs-extra");
// const path = require("path");
// const webpack = require("webpack");

// // Do this as the first thing so that any code reading it knows the right env.
// process.env.BABEL_ENV = "production";
// process.env.NODE_ENV = "production";

// const clientConfig = require("../config/webpack.config.prod");
// const serverConfig = require("../config/webpack.config.server");
// const { getClientEnvironment, getServerEnvironment } = require("../config/env");
// const paths = require("../config/paths");

// const clientEnv = getClientEnvironment(paths.publicUrl);

// const buildWithConfig = (config, kind) => async () => {
//   const compiler = webpack(config);
//   return new Promise((resolve, reject) => {
//     compiler.run((err, stats) => {
//       if (err) {
//         return reject(err);
//       }
//       const messages = formatWebpackMessages(stats.toJson({}, true));
//       if (messages.errors.length) {
//         // Only keep the first error. Others are often indicative
//         // of the same problem, but confuse the reader with noise.
//         if (messages.errors.length > 1) {
//           messages.errors.length = 1;
//         }
//         return reject(new Error(messages.errors.join("\n\n")));
//       }
//       if (
//         process.env.CI &&
//         (typeof process.env.CI !== "string" ||
//           process.env.CI.toLowerCase() !== "false") &&
//         messages.warnings.length
//       ) {
//         console.log(
//           chalk.yellow(
//             "\nTreating warnings as errors because process.env.CI = true.\n" +
//               "Most CI servers set it automatically.\n"
//           )
//         );
//         return reject(new Error(messages.warnings.join("\n\n")));
//       }
//       return resolve({ stats, warnings: messages.warnings, kind });
//     });
//   });
// };

// const buildClient = buildWithConfig(clientConfig, "Client");
// const buildServer = buildWithConfig(
//   { ...serverConfig, mode: "production" },
//   "Server"
// );

// const printResults = ({ stats, warnings, kind }) => {
//   if (warnings.length) {
//     console.log(chalk.yellow(`Compiled ${kind} with warnings.\n`));
//     console.log(warnings.join("\n\n"));
//     console.log(
//       "\nSearch for the " +
//         chalk.underline(chalk.yellow("keywords")) +
//         " to learn more about each warning."
//     );
//     console.log(
//       "To ignore, add " +
//         chalk.cyan("// eslint-disable-next-line") +
//         " to the line before.\n"
//     );
//   } else {
//     console.log(chalk.green(`Compiled ${kind} successfully.\n`));
//   }
// };

// const build = async () => {
//   copyPublicFolder();
//   const results = await Promise.all([buildClient(), buildServer()]);
//   results.forEach(printResults);
// };

// const copyPublicFolder = () => {
//   fs.copySync(paths.appPublic, path.join(paths.appClientBuild), {
//     dereference: true,
//     filter: file => file !== paths.appHtml
//   });
// };

// build().catch(err => {
//   throw err;
// });
