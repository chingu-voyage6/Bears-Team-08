import * as supertest from "supertest";
import * as pino from "pino";

import { MongoDB, MongoDBOptions, connect } from "../lib/database";
import { AppServer, createAppContainer, createServer } from "../server";

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

async function init(): Promise<AppServer> {
  return new Promise<AppServer>(async resolve => {
    const logger = pino({ name: "test", level: "silent" });
    const container = createAppContainer(await database, logger);
    resolve(createServer(container));
  });
}

export const testServer = init();

export async function shutdown() {
  const app = await testServer;
  const db = await database;
  const shutdowns = [
    async () => await app.close(),
    async () => db.connection.close()
  ];
  for (const s in shutdowns) {
    try {
      await s;
    } catch (e) {
      console.error("Error in graceful shutdown:", e);
    }
  }
}

export async function createUserTest(user: any): Promise<any> {
  // const res = await supertest(testServer)
  //   .post("/api/v1/users")
  //   .send(user)
  //   .expect(201);
  const res = { body: {} };
  return res.body;
}
