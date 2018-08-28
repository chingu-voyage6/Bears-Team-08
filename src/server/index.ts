import {
  AppServer,
  createServer,
  AppContainer,
  createAppContainer
} from "./server";
import * as Config from "./config";
import { baseLogger } from "./lib/logger";
import { Database } from "./lib/database";

const logger = baseLogger;

export async function init() {
  const components = [];

  try {
    const webLogger = baseLogger.child({ name: "webserver" });

    const db = new Database(Config.dbConfig);
    components.push(() => {
      db.close();
    });

    const container = createAppContainer(db, webLogger);
    const app = createServer(container);
    components.push(() => {
      app.closeServer();
    });

    app.listen(Config.port, () => {
      logger.info(`Application running on port: ${Config.port}`);
    });

    registerProcessEvents(components);
  } catch (e) {
    let exitCode = 0;
    for (const c of components) {
      const code = await shutdown(c);
      exitCode = code;
    }
    throw e;
  }
}

function registerProcessEvents(components: Array<() => Promise<void>>) {
  process.on("uncaughtException", (err: Error) => {
    logger.error("UncaughtException:", err);
  });

  process.on("unhandledRejection", (err: Error) => {
    logger.error("UnhandledRejection:", err);
  });

  process.on("SIGTERM", async () => {
    logger.info("Starting graceful shutdown");

    let exitCode = 0;
    for (const c of components) {
      const code = await shutdown(c);
      if (code > 0) {
        exitCode = code;
      }
    }
    process.exit(exitCode);
  });
}

async function shutdown(component: () => Promise<void>): Promise<number> {
  try {
    await component();
  } catch (err) {
    return 1;
  }
  return 0;
}

init().catch(err => {
  logger.error("An error occured while initializing application: ", err);
  process.emit("SIGTERM");
});
