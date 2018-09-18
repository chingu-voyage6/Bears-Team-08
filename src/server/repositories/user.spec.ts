import * as Crypto from "../lib/crypto";
import { Role } from "@shared/contract";
import { TestDatabase, Database } from "../lib/database";
import { User } from "../entities";
import { UserRepository } from "./user";
import { ValidationError } from "../errors";
import { users as testUsers } from "../testUtil";

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

  describe("user pagination", async () => {
    it("should be able to grab 10 users", async () => {
      const users = await repo.find();
      expect(users).toHaveLength(10);
    });

    it("should correctly paginate", async () => {
      const userBatch1 = await repo.find(10, 0);
      const userBatch2 = await repo.find(10, 10);
      expect(userBatch1).toHaveLength(10);
      expect(userBatch2).toHaveLength(10);

      for (let i = 0; i < 10; i++) {
        expect(userBatch2.indexOf(userBatch1[0])).toEqual(-1);
      }
    });
  });

  it("should be able to find an existing user by email", async () => {
    const expectedUser = testUsers[0];
    const user = await repo.findByEmail(expectedUser.email);
    expect(user.username).toEqual(expectedUser.username);
  });

  it("should be able to find an existing user by username", async () => {
    const expectedUser = testUsers[0];
    const user = await repo.findByUsername(expectedUser.username);
    expect(user.username).toEqual(expectedUser.username);
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
    const existingUser = testUsers[0];
    expect(
      repo.insert({ username: existingUser.username })
    ).rejects.toThrowError();
  });

  it("should be able to update users information", async () => {
    const expectedUser = testUsers[0];
    const dateBefore = expectedUser.updatedAt;
    const user = await repo.findByUsername(expectedUser.username);

    const newFirstName = "jack";
    user.firstName = newFirstName;

    const updatedUser = await repo.update(user);
    expect(updatedUser.username).toEqual(expectedUser.username);
    expect(updatedUser.firstName).toEqual(newFirstName);
    expect(updatedUser.updatedAt.getTime()).toBeGreaterThan(
      dateBefore.getTime()
    );
  });
});
