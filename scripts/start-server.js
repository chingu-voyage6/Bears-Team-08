"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", err => {
  throw err;
});

const fs = require("fs");
const chalk = require("chalk");
const webpack = require("webpack");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const {
  choosePort,
  prepareUrls
} = require("react-dev-utils/WebpackDevServerUtils");

const config = require("../config/webpack.config.server");
const { getServerEnvironment } = require("../config/env");
const paths = require("../config/paths");

const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY;

const env = getServerEnvironment();

if (!env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(env.HOST)
      )}`
    )
  );
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  );
  console.log(`Learn more here: ${chalk.yellow("http://bit.ly/2mwWSwH")}`);
  console.log();
}

const startServer = async () => {
  const port = await choosePort(env.HOST, env.SERVER_APP_PORT);
  const compiler = webpack(config);
  return new Promise((resolve, reject) => {
    const watching = compiler.watch({}, (err, stats) => {
      // console.log("stats", stats.toJson().assets);
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join("\n\n")));
      }

      if (
        process.env.CI &&
        (typeof process.env.CI !== "string" ||
          process.env.CI.toLowerCase() !== "false") &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            "\nTreating warnings as errors because process.env.CI = true.\n" +
              "Most CI servers set it automatically.\n"
          )
        );
        return reject(new Error(messages.warnings.join("\n\n")));
      }

      return resolve({
        stats,
        warnings: messages.warnings
      });
    });

    ["SIGINT", "SIGTERM"].forEach(sig => {
      process.on(sig, () => {
        watching.close();
        process.exit();
      });
    });
  });
};

startServer();
