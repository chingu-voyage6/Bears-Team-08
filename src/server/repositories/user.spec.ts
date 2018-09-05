import { User } from "../entities";
import { UserRepository } from "./user";
import { TestDatabase, Database } from "../lib/database";
import * as Crypto from "../lib/crypto";
import { Role } from "@shared/contract";
import { ValidationError } from "../errors";

describe("UserRepository", () => {
  let database: Database;
  let repo: UserRepository;

  beforeEach(async () => {
    database = new TestDatabase();
    repo = new UserRepository(database);
    await database.migrateLatest();
    await database.seed();
  });

  afterEach(async () => {
    await database.close();
  });

  it("should find an existing user by email", async () => {
    const user = await repo.findByEmail("jack@example.com");
    expect(user.username).toEqual("jack");
  });

  it("should find an existing user by username", async () => {
    const user = await repo.findByUsername("jack");
    expect(user.username).toEqual("jack");
  });

  it("should be able to insert a new user with a unique username", async () => {
    const hasher = new Crypto.BCryptHasher(8);
    const newUser: User = {
      username: "jlrickert",
      email: "jlrickert@example.com",
      firstName: "Jared",
      lastName: "Rickert",
      hash: await hasher.hashPassword("shh")
    };

    await repo.insert(newUser);
    const user = await repo.findByUsername("jlrickert");
    for (const field of ["username", "email", "firstName", "lastName"]) {
      expect(user[field]).toEqual(newUser[field]);
    }

    const now = new Date();
    expect(user.updatedAt.getDay()).toEqual(now.getDay());
    expect(user.createdAt.getDay()).toEqual(now.getDay());
    expect(hasher.verifyPassword("shh", user.hash)).toBeTruthy();
  });

  it("should not be able to insert a new user with a preexisting username", async () => {
    expect(repo.insert({ username: "jack" })).rejects.toThrowError();
  });

  it("should be able to update users information", async () => {
    const user = await repo.findByUsername("jack");
    user.firstName = "jack";
    user.lastName = "rabbit";
    expect(await repo.update(user)).toEqual(user);
  });
});
