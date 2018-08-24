import * as knex from "knex";

export async function up(db: knex): Promise<void> {
  migrateUserTable(db);
}

async function migrateUserTable(db: knex): Promise<void> {
  const exists = db.schema.hasTable("user");
  if (!exists) {
    await db.schema.createTable("user", t => {
      t.increments("id").primary();
      t.string("username", 64).notNullable();
      t.string("passwd", 256);
      t.string("email", 64).unique();
      t.enum("role", ["user", "admin"]).notNullable();
      t.timestamps();
    });
  }
}

export async function down(db: knex): Promise<any> {
  const tables = ["user"];
  return Promise.all(tables.map(db.schema.dropTableIfExists));
}
