import {
  AppServer,
  createServer,
  AppContainer,
  createAppContainer
} from "./server";
import { newLogger } from "./util/logger";
import * as Config from "./config";
import { MongoDB } from "./lib/database";

export const init = async () => {
  const logger = newLogger();
  try {
    const db = new MongoDB(Config.mongoURI);

    const container = createAppContainer(db, logger);
    const app = createServer(container);

    app.listen(Config.port, () => {
      logger.info(`Application running on port: ${Config.port}`);
    });

    registerProcessEvents(app, container);
  } catch (err) {
    logger.error("An error occured while initializing application: ", err);
  }
};

const registerProcessEvents = (
  app: AppServer,
  { db, logger }: AppContainer
) => {
  process.on("uncaughtException", (err: Error) => {
    logger.error("UncaughtException:", err);
  });

  process.on("unhandledRejection", (err: Error) => {
    logger.error("UnhandledRejection:", err);
  });

  process.on("SIGTERM", async () => {
    logger.info("Starting graceful shutdown");

    let exitCode = 0;
    const shutdown = [app.close(), db.close()];
    for (const s of shutdown) {
      try {
        await s;
      } catch (err) {
        logger.error("Error in graceful shutdown ", err);
        exitCode = 1;
      }
    }

    process.exit(exitCode);
  });
};

init();
