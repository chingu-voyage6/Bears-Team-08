import * as knex from "knex";
import * as Fs from "fs";
import * as Path from "path";

import { newLogger } from "../logger";

const logger = newLogger({ file: "lib/database.ts" });

export type Configuration = {
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
  debug?: boolean;
};

export type Connection = knex;
export type Transaction = knex.Transaction;

export const migrationPath = Path.resolve(__dirname, "./migrations");

export class Database {
  protected config: Configuration;
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

  public async makeMigration(name: string): Promise<void> {
    const filename = Path.resolve(
      migrationPath,
      `${yyyymmddhhmmss()}_${name}.ts`
    );
    const content = `import * as knex from "knex"

export async function up(db: knex): Promise<void> {

}

export async function down(db: knex): Promise<void> {

}
`;

    await new Promise((resolve, reject) => {
      Fs.writeFile(filename, content, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  // This only works for tests and with ts-node
  public async migrateLatest(): Promise<void> {
    const conn = await this.getConnection();
    return conn.migrate.latest({ directory: migrationPath });
  }

  // This only works for tests and with ts-node
  public async rollback(): Promise<void> {
    const conn = await this.getConnection();
    return conn.migrate.rollback({ directory: migrationPath });
  }

  // This only works for tests and with ts-node
  public async makeSeed(name: string, dir: string): Promise<void> {
    const conn = await this.getConnection();
    return conn.seed.make(name, { directory: dir });
  }

  // This only works for tests and with ts-node
  public async seed(): Promise<void> {
    const conn = await this.getConnection();
    return conn.seed.run({ directory: Path.resolve(__dirname, "seeds") });
  }

  protected async createConnection(): Promise<Connection> {
    const config: knex.Config = {
      client: "pg",
      debug: this.config.debug,
      connection: this.config,
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

export class TestDatabase extends Database {
  private debug: boolean;
  constructor(debug: boolean = false) {
    super(null);
    this.debug = debug;
  }

  public async seed(): Promise<void> {
    const conn = await this.getConnection();
    return conn.seed.run({
      directory: Path.resolve(__dirname, "seeds", "testing")
    });
  }

  protected async createConnection(): Promise<Connection> {
    const db = knex({
      client: "sqlite3",
      debug: this.debug,
      connection: { filename: ":memory:" },
      useNullAsDefault: true,
      migrations: {
        tableName: "migrations"
      }
    });

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
