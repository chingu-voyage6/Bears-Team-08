import * as knex from "knex";
import * as fs from "fs";
import * as path from "path";

import { newLogger } from "../logger";

const logger = newLogger({ file: "lib/database.ts" });

export type Configuration = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  debug: boolean;
};

export type Connection = knex;
export type Transaction = knex.Transaction;

const migrationPath = path.resolve(__dirname, "./migrations");

export class Database {
  private config: Configuration;
  private connection: Connection | undefined;
  constructor(config: Configuration) {
    this.config = config;
  }

  public async getConnection(): Promise<Connection> {
    if (!this.connection) {
      this.connection = await this.createConnection();
    }

    return this.connection;
  }

  public async getTransaction(): Promise<Transaction> {
    const conn = await this.getConnection();
    return new Promise<knex.Transaction>((resolve, reject) => {
      try {
        conn.transaction((trx: knex.Transaction) => {
          resolve(trx);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  public async close(): Promise<void> {
    if (this.connection) {
      const conn = await this.connection;
      await conn.destroy();
      this.connection = undefined;
    }
  }

  public async migrateLatest(): Promise<void> {
    const conn = await this.getConnection();
    await conn.migrate.latest({
      directory: path.resolve(__dirname, "./migrations")
    });
  }

  public async rollback(): Promise<void> {
    const conn = await this.getConnection();
    return conn.migrate.rollback({
      directory: path.resolve(__dirname, "./migrations")
    });
  }

  public async makeSeed(name: string, dir: string): Promise<void> {
    const conn = await this.getConnection();
    return conn.seed.make(name, { directory: dir });
  }

  public async seed(directory: string): Promise<void> {
    const conn = await this.getConnection();
    return conn.seed.run({ directory });
  }

  public makeMigration(name: string): Promise<any> {
    if (!name) {
      return Promise.reject(
        new Error("A name must be specified for the generated migration")
      );
    }

    const filename = path.resolve(
      migrationPath,
      `${yyyymmddhhmmss()}_${name}.ts`
    );
    const content = `import * as knex from "knex"

export async function up(db: knex): Promise<void> {

}

export async function down(db: knex): Promise<void> {

}
`;

    fs.writeFileSync(filename, content);
  }

  private async createConnection(): Promise<Connection> {
    const config: knex.Config = {
      client: "pg",
      connection: {
        host: this.config.host,
        port: this.config.port,
        user: this.config.user,
        password: this.config.password,
        database: this.config.database
      },
      debug: this.config.debug,
      migrations: {
        tableName: "migrations"
      }
    };
    const db = knex(config);

    // Test database connectivity
    await db.raw("select 1").timeout(500);

    return db;
  }
}

// Ensure that we have 2 places for each of the date segments.
function padDate(segment: number): string {
  const seg = segment.toString();
  return seg[1] ? seg : `0${seg}`;
}

// Get a date object in the correct format, without requiring a full out library
// like "moment.js".
function yyyymmddhhmmss(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();

  return [year, month, day, hour, minutes, seconds].map(padDate).join("");
}
