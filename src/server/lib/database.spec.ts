import { Database } from "./database";
import * as Config from "../util/config";

describe("PostgreSQL api", async () => {
  it("should be able to connect to a PostgreSQL Server", async () => {
    const db = new Database(Config.dbConfig);
    const conn = await db.getConnection();
    expect(conn.select("select 1").first).toEqual("rawr");
    // const options = {};
    // const db = await connect(
    //   "mongodb://localhost:27017/jest",
    //   options
    // );
    // expect(db.models).toEqual("rawr");
  });

  it("should create migratations", async () => {
    const db = new Database(Config.dbConfig);
    const conn = await db.getConnection();
    db.schemaMigration();
    const rows = conn.select().from("information_schema.tables").all;
    expect(rows).toEqual(["a", "b"]);
  });
});
