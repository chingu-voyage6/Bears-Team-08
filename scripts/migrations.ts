/* tslint:disable:no-console */

import * as knex from "knex";
import { Database } from "../src/server/lib/database";
import * as Config from "../src/server/config";

type Command = "new" | "latest" | "rollback";

const argv = process.argv.slice(2);
const cmd: Command = (argv[0] as Command) || "latest";

async function init(): Promise<void> {
  const database = new Database(Config.dbConfig);

  try {
    switch (cmd) {
      case "new": {
        const name = argv[1];
        if (!name) {
          return Promise.reject("Please pass in name of migration");
        }
        await database.makeMigration(name);
        break;
      }
      case "latest": {
        await database.migrateLatest();
        break;
      }
      case "rollback": {
        await database.rollback();
        break;
      }
      default: {
        await database.migrateLatest();
        break;
      }
    }
  } finally {
    await database.close();
  }
}

init().catch(e => console.log(e));
