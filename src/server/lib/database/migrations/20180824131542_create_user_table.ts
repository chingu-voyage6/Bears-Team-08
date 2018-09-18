import * as knex from "knex";

export async function up(db: knex): Promise<void> {
  await migrateUserTable(db);
}

export async function down(db: knex): Promise<void> {
  await db.schema.dropTableIfExists("user");
}

async function migrateUserTable(db: knex): Promise<void> {
  const exists = await db.schema.hasTable("user");
  if (!exists) {
    await db.schema.createTable("user", t => {
      t.uuid("id").primary();
      t.string("username", 64)
        .notNullable()
        .unique();
      t.string("first_name");
      t.string("last_name");
      t.string("hash", 256);
      t.string("email", 64).unique();
      t.enum("role", ["user", "admin"])
        .notNullable()
        .defaultTo("user");
      t.timestamps();

      t.index(["username"]);
    });
  }
}
