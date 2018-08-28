import { Database } from "./database";
import * as Config from "../config";

describe("PostgreSQL api", async () => {
  it("should be able to connect to a PostgreSQL Server", async () => {
    const db = new Database(Config.dbConfig);
    expect(db.getConnection).toBeTruthy();
  });

  it("should create migratations", async () => {
    const db = new Database(Config.dbConfig);
    const conn = await db.getConnection();
    await db.migrateLatest();
    const query = conn.table("information_schema.tables").select("table_name");
    const rows = (await query)
      .map(row => row.table_name)
      .filter(table => table === "user");
    expect(rows).toEqual(["a", "b"]);
    await db.rollback();
  });
});
