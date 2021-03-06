import { Database, TestDatabase, Connection } from "./database";
import * as Config from "../config";
import { users as testUsers } from "../testUtil";

describe("Database api", async () => {
  let database: Database;
  let conn: Connection;

  beforeAll(async () => {
    database = new TestDatabase();
    conn = await database.getConnection();
  });

  afterAll(async () => {
    await database.close();
  });

  beforeEach(async () => {
    await database.rollback();
  });

  it("should be able to connect to a PostgreSQL Server", async () => {
    expect(database.getConnection).toBeTruthy();
  });

  describe("for migrations", async () => {
    it("should correctly migrate", async () => {
      await database.migrateLatest();
      const tables = await getTableList(database);
      expectAllTables(tables);
    });

    it("should not error on multiple migrations", async () => {
      await database.migrateLatest();
      await database.migrateLatest();
      await database.migrateLatest();

      const tables = await getTableList(database);
      expectAllTables(tables);
    });

    it("should correctly rollback", async () => {
      await database.migrateLatest();
      await database.rollback();
      const tables = await getTableList(database);
      expectBaseTables(tables);
    });

    it("should not error on multiple rollbacks", async () => {
      await database.rollback();
      await database.rollback();
      await database.rollback();

      const tables = await getTableList(database);
      expectBaseTables(tables);
    });
  });

  describe("for seeding", async () => {
    beforeEach(async () => {
      await database.rollback();
      await database.migrateLatest();
    });

    it("should correctly seed the database", async () => {
      const conn = await database.getConnection();

      const query = await conn.table("user").select();
      expect(query.length).toEqual(0);

      await database.seed();
      const users = await conn.table("user").select();
      const expectedUsernames = testUsers.map(user => user.username);
      const usernames = users.map(u => u.username);
      for (const username of expectedUsernames) {
        expect(usernames).toContain(username);
      }
    });
  });
});

async function getTableList(db: Database): Promise<string[]> {
  const conn = await db.getConnection();
  if (db instanceof TestDatabase) {
    const rows = await conn
      .table("sqlite_master")
      .select("tbl_name")
      .where("type", "table");
    return rows.map(r => r.tbl_name);
  } else {
    const rows = await conn
      .table("information_schema.tables")
      .where("table_name", "user");
    return rows.map(r => r.table_name);
  }
}

async function expectAllTables(tables: string[]): Promise<void> {
  expect(tables).toContain("user");
}

async function expectBaseTables(tables: string[]): Promise<void> {
  expect(tables).not.toContain("user");
}
