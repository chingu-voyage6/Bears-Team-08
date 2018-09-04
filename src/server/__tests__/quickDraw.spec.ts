import * as pino from "pino";

import { Database } from "../lib/database";
import { AppServer, createServer, createServiceContainer } from "../server";
import * as Config from "../config";
import { createUserAppTestSuite } from "./apps/users";

describe("Quick Draw", () => {
  const database = new Database(Config.dbConfig);
  const logger = pino({ name: "test", level: "silent" });
  const container = createServiceContainer(database, logger);
  const testServer = createServer(container);

  beforeAll(async () => {
    await database.migrateLatest();
  });

  afterAll(async () => {
    await database.rollback();

    const shutdowns = [
      async () => database.close()
      // async () => testServer.closeServer()
    ];
    for (const fn of shutdowns) {
      try {
        await fn();
      } catch (e) {
        console.error(e);
      }
    }
    return;
  });

  describe("User endpoint", createUserAppTestSuite(testServer, database));
});
