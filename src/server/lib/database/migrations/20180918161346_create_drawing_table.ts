import * as knex from "knex";

export async function up(db: knex): Promise<void> {
  await migrateDrawingTable(db);
}

export async function down(db: knex): Promise<void> {}

async function migrateDrawingTable(db: knex): Promise<void> {
  const exists = await db.schema.hasTable("drawing");
  if (!exists) {
    await db.schema.createTable("drawing", t => {
      t.uuid("id").primary();
      t.string("name");
      t.uuid("user_id")
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
