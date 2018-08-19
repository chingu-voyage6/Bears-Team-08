import * as Mongoose from "mongoose";

import { newLogger } from "../lib/logger";

export type MongoDBOptions = Mongoose.ConnectionOptions;

const logger = newLogger({ file: "lib/database.ts" });

export const connect = async (
  uri: string,
  options?: MongoDBOptions
): Promise<MongoDB> => {
  const db = await Mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      ...options
    }
  );

  db.connection.on("error", err => {
    if (err.message.code === "ETIMEDOUT") {
      db.connect(this.uri);
    }
    logger.error("Database error:", err);
  });
  db.connection.on("error", err => {
    logger.error("Database error:", err);
  });
  db.connection.once("open", () => {
    logger.info(`MongoDB successfully connected to ${uri}`);
  });

  return new MongoDB(uri, db);
};

export class MongoDB {
  private mongoose = Mongoose;
  private uri: string;

  constructor(uri: string, db: Mongoose.Mongoose) {
    this.uri = uri;
    this.mongoose = db;
  }

  public model<T extends Mongoose.Document>(
    name: string,
    schema: Mongoose.Schema
  ): Mongoose.Model<T> {
    return this.mongoose.model<T>(name, schema);
  }

  public async close(): Promise<void> {
    this.mongoose.connection.close();
  }
  public async on(event: string | symbol, listener: (...args: any[]) => void) {
    const conn = await this.mongoose;
    conn.connection.on(event, listener);
  }
}
