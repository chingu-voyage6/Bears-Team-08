/* tslint:disable:no-console */

import * as knex from "knex";
import { Database } from "../src/server/lib/database";
import * as Config from "../src/server/config";

async function init(): Promise<void> {
  const database = new Database(Config.dbConfig);
  console.log("Seeding database");
  await database.seed();
}

init()
  .then(() => {
    console.log("Done seeding");
    process.exit(0);
  })
  .catch(e => console.error("ERROR:", e));
