import * as knex from "knex";

import {
  testSqlUsers,
  testAdminUser,
  testAdminSqlUser,
  testSqlDrawings,
  testSqlDrawingContributors
} from "../../../testUtil";

export async function seed(db: knex): Promise<void> {
  await db.table("user").insert(testSqlUsers.concat(testAdminSqlUser));
  await db.table("drawing").insert(testSqlDrawings);
  await db.table("drawing_contributors").insert(testSqlDrawingContributors);
}
