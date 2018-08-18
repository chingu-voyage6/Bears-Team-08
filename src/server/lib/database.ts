import * as Mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

import { Logger } from "../util/logger";

export type MongoDBOptions = Mongoose.ConnectionOptions & {
  logger?: Logger;
  inMemory?: boolean;
};

export class MongoDB {
  private uri: Promise<string>;
  private mongoServer?: MongoMemoryServer;
  private mongoose: Promise<Mongoose.Mongoose>;
  private logger?: Logger;

  constructor(uri: string, options?: MongoDBOptions) {
    this.logger = options.logger;

    if (options.inMemory) {
      this.mongoServer = new MongoMemoryServer();
      this.uri = this.mongoServer.getConnectionString();
      this.mongoose = this.createInMemoryMongoose();
    } else {
      this.uri = Promise.resolve(uri);
      this.mongoose = Mongoose.connect(
        uri,
        { useNewUrlParser: true, ...options } as Mongoose.ConnectionOptions
      );
    }

    this.mongoose.then(async db => {
      const logger = options.logger;
      if (logger) {
        this.logger = logger;
      }

      db.connection.on("error", async err => {
        if (err.message.code === "ETIMEDOUT") {
          db.connect(await this.uri);
        }
        if (this.logger) {
          this.logger.error("MongoDB Error:", err);
        }
      });
      db.connection.once("open", async () => {
        if (this.logger) {
          this.logger.info(`MongoDB successfully connect to ${await this.uri}`);
        }
      });
    });
  }

  public get conn(): Promise<Mongoose.Connection> {
    return this.mongoose.then(db => db.connection);
  }

  public async createModel<T extends Mongoose.Document>(
    name: string,
    schema: Mongoose.Schema
  ): Promise<Mongoose.Model<T>> {
    const conn = await this.conn;
    return this.conn.then(c => c.model<T>(name, schema));
  }

  public async close() {
    const conn = await this.mongoose;
    conn.disconnect();
    this.mongoServer.stop();
  }

  private async createInMemoryMongoose(): Promise<Mongoose.Mongoose> {
    return Mongoose.connect(
      await this.uri,
      {
        autoReconnect: true,
        reconnectTries: Number.MIN_VALUE,
        reconnectInterval: 1000,
        useMongoClient: true
      }
    );
  }
}
