import * as knex from "knex";

const tableName = "user";

export async function up(db: knex): Promise<void> {
  await migrateUserTable(db);
}

export async function down(db: knex): Promise<void> {
  await db.schema.dropTableIfExists(tableName);
}

async function migrateUserTable(db: knex): Promise<void> {
  const exists = await db.schema.hasTable(tableName);
  if (!exists) {
    await db.schema.createTable(tableName, t => {
      t.uuid("id").primary();
      t.string("username")
        .notNullable()
        .unique();
      t.string("first_name");
      t.string("last_name");
      t.string("hash", 256);
      t.string("email").unique();
      t.enum("role", ["user", "admin"])
        .notNullable()
        .defaultTo("user");
      t.timestamps();

      t.index(["username"]);
    });
  }
}
