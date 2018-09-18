import * as knex from "knex";

import {
  testSqlUsers,
  testAdminUser,
  testAdminSqlUser
} from "../../../testUtil";

export async function seed(db: knex): Promise<void> {
  return db.table("user").insert(testSqlUsers.concat(testAdminSqlUser));
}
