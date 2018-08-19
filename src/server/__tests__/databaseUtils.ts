import * as pino from "pino";
import { MongoMemoryServer } from "mongodb-memory-server";

import { MongoDB, MongoDBOptions, connect } from "../lib/database";

export const database: Promise<MongoDB> = new Promise(async resolve => {
  const mongodbServer = new MongoMemoryServer();

  const mongodbOptions: MongoDBOptions = {
    autoReconnect: true,
    reconnectTries: Number.MIN_VALUE,
    reconnectInterval: 1000,
    useMongoClient: true
  };
  const mongoURI = await mongodbServer.getConnectionString();
  const db = await connect(
    mongoURI,
    mongodbOptions
  );

  resolve(db);

  db.on("close", () => {
    mongodbServer.stop();
  });
});
