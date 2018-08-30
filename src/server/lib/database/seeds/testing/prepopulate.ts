import * as knex from "knex";
import { RawUser } from "../../../../repositories/user";
import { uuidv4 } from "../../../../lib/crypto";

function userVariance(prefix: string) {
  return (user: RawUser): RawUser => ({
    username: `${prefix}${user.username}`,
    email: `${prefix}${user.email}`
  });
}

function createUser(username: string): RawUser {
  return {
    id: uuidv4(),
    username,
    email: `${username}@example.com`,
    created_at: new Date(),
    updated_at: new Date()
  };
}

export async function seed(db: knex): Promise<void> {
  const baseUsers = ["jack", "jill", "abby"].map(createUser);
  const variants = ["", "RU"];
  const users = variants
    .map(v => {
      const userVariations = baseUsers.map(userVariance(v));
      return userVariations;
    })
    .reduce((l, r) => l.concat(r));
  return db.table("user").insert(users);
}
