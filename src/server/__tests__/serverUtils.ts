import * as pino from "pino";

import { database } from "./databaseUtils";
import { createServer, createAppContainer, AppServer } from "../server";

export const appServer = new Promise<AppServer>(async resolve => {
  const logger = pino({ name: "test", level: "silent" });
  const db = await database;
  const container = createAppContainer(db, logger);
  return createServer(container);
});
