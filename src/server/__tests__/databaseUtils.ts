import * as pino from "pino";
import { MongoMemoryServer } from "mongodb-memory-server";

import { MongoDB, MongoDBOptions, connect } from "../lib/database";

const mongodbOptions: MongoDBOptions = {
  autoReconnect: true,
  reconnectTries: Number.MIN_VALUE,
  reconnectInterval: 1000,
  dbName: global.__MONGO_DB_NAME__
};

export const database = connect(
  global.__MONGO_URI__,
  mongodbOptions
);
