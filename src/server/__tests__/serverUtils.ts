import * as pino from "pino";

import { database } from "./databaseUtils";
import { createServer, createAppContainer } from "../server";

export const appServer = new Promise(async resolve => {
  const logger = pino({ name: "test", level: "silent" });
  const db = await database;
  const container = createAppContainer(db, logger);
  createServer(container);
});
