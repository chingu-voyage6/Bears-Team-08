import * as Path from "path";

import * as pino from "pino";

import { Database } from "../lib/database";
import * as Config from "../config";
import { createServer, createAppContainer, AppServer } from "../server";

export let testServer: AppServer;
export let database: Database;

beforeAll(async () => {
  database = new Database(Config.dbConfig);
  // await database.migrateLatest();
  const logger = pino({ name: "test", level: "silent" });
  const container = createAppContainer(database, logger);
  testServer = createServer(container);
  await database.seed(Path.resolve(__dirname, "seeds"));
});

afterAll(async () => {
  await database.rollback();
  const shutdowns = [
    async () => database.close(),
    async () => testServer.closeServer()
  ];
  for (const fn of shutdowns) {
    try {
      await fn();
    } catch (e) {
      console.error(e);
    }
  }
});
