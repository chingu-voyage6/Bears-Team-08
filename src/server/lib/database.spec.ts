import { Database, Connection } from "./database";
import * as Config from "../config";

let database: Database;
let conn: Connection;
beforeAll(async () => {
  database = new Database(Config.dbConfig);
  conn = await database.getConnection();
});

afterAll(async () => {
  await database.close();
});

describe("PostgreSQL api", async () => {
  it("should be able to connect to a PostgreSQL Server", async () => {
    expect(database.getConnection).toBeTruthy();
  });

  describe("migrations", async () => {
    it("should correctly migrate", async () => {
      await database.migrateLatest();
      const rows = await conn
        .table("information_schema.tables")
        .where("table_name", "user");
      expect(rows.length).toEqual(1);
    });

    it("should not error on multiple migrations", async () => {
      await database.migrateLatest();
      await database.migrateLatest();
      await database.migrateLatest();
      const rows = await conn
        .table("information_schema.tables")
        .where("table_name", "user");
      expect(rows.length).toEqual(1);
    });

    it("should correctly teardown", async () => {
      await database.migrateLatest();
      await database.rollback();
      const rows = await conn
        .table("information_schema.tables")
        .where("table_name", "user");
      expect(rows.length).toEqual(0);
    });

    it("should not error on multiple teardowns", async () => {
      await database.rollback();
      await database.rollback();
      await database.rollback();
      const rows = await conn
        .table("information_schema.tables")
        .where("table_name", "user");
      expect(rows.length).toEqual(0);
    });
  });
});
