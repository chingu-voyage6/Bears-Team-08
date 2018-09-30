import * as knex from "knex";

const tableName = "drawing_contributors";

export async function up(db: knex): Promise<void> {
  await migrateContributorTable(db);
}

export async function down(db: knex): Promise<void> {
  await db.schema.dropTableIfExists(tableName);
}

async function migrateContributorTable(db): Promise<void> {
  const exists = await db.schema.hasTable(tableName);
  if (!exists) {
    await db.schema.createTable(tableName, t => {
      t.uuid("id").primary();
      t.uuid("user_id")
        .notNullable()
        .references("user.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      t.uuid("drawing_id")
        .notNullable()
        .references("drawing.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      t.unique(["user_id", "drawing_id"]);
    });
  }
}
