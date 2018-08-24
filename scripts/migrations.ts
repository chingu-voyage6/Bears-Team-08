import * as knex from "knex";
import { Database } from "../src/server/lib/database";
import * as Config from "../src/server/util/config";

type Command = "migrate" | "new";

const argv = process.argv.slice(2);
const cmd: Command = (argv[0] as Command) || "migrate";

async function init(): Promise<void> {
  const database = new Database(Config.dbConfig);

  try {
    if (cmd === "migrate") {
      await database.schemaMigration();
    } else if (cmd === "new") {
      const name = argv[1];
      if (!name) {
        return Promise.reject("Please pass in name of migration");
      }
      database.makeMigration(name);
    }
  } finally {
    database.close();
  }
}

init().catch(e => console.log(e));
