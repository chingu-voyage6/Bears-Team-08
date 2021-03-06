import * as knex from "knex";

const tableName = "drawing";

export async function up(db: knex): Promise<void> {
  await migrateDrawingTable(db);
}

export async function down(db: knex): Promise<void> {
  await db.schema.dropTableIfExists(tableName);
}

async function migrateDrawingTable(db: knex): Promise<void> {
  const exists = await db.schema.hasTable(tableName);
  if (!exists) {
    await db.schema.createTable(tableName, t => {
      t.uuid("id").primary();
      t.string("name");
      t.uuid("owner_id")
        .references("user.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      t.integer("width");
      t.integer("height");
      t.timestamps();
      t.jsonb("data");
    });
  }
}
