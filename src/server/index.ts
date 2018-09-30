import { AppServer, createServer } from "./server";
import * as Config from "./config";
import { baseLogger } from "./lib/logger";
import { Database } from "./lib/database";
import { Application } from "./application";

export async function init() {
  const app = new Application({
    dbConfig: Config.dbConfig,
    secretKey: Config.secretKey
  });

  try {
    await app.init();
  } catch (err) {
    app.errorLogger.error(
      "An error occured while initializing application:",
      err
    );
  }

  const server = createServer(app, {
    https: Config.isHttps,
    cert: Config.certFile,
    key: Config.keyFile
  });

  try {
    server.listen(Config.port, () => {
      app.webLogger.info(`Application running on port ${Config.port}`);
    });
    registerProcessEvents(server, app);
  } catch (err) {
    app.errorLogger.error(
      "An error occured while initializing application: ",
      err
    );
    await app.shutdown();
    await server.closeServer();
  }
}

function registerProcessEvents(server: AppServer, app: Application) {
  process.on("uncaughtException", (err: Error) => {
    app.errorLogger.error("UncaughtException:", err);
  });

  process.on("unhandledRejection", (err: Error) => {
    app.errorLogger.error("UnhandledRejection:", err);
  });

  const signals = ["SIGTERM", "SIGINT"];
  signals.forEach(sig =>
    process.on(sig as any, async () => {
      app.webLogger.info("Starting graceful shutdown");

      let exitCode = 0;
      try {
        app.shutdown();
      } catch (err) {
        exitCode = 1;
      }
      process.exit(exitCode);
    })
  );
}

init().catch(err => {
  process.emit("SIGTERM");
});
