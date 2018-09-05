import { Database, TestDatabase } from "../lib/database";
import { UserManager } from "./user";
import { UserRepository } from "../repositories";
import { BCryptHasher } from "../lib/crypto";
import { Authenticator, JWTAuthenticator } from "../lib/authentication";

describe("UserManager", async () => {
  let database: Database;
  let repo: UserRepository;
  let hasher: BCryptHasher;
  let auth: Authenticator;
  let manager: UserManager;

  beforeEach(async () => {
    database = new TestDatabase();
    repo = new UserRepository(database);
    hasher = new BCryptHasher(8);
    auth = new JWTAuthenticator(repo);
    manager = new UserManager(repo, hasher, auth);
    await database.migrateLatest();
    await database.seed();
  });

  afterEach(async () => {
    await database.close();
  });

  it("should be able to login a user with valid credentials", async () => {
    const token = await manager.login("jack", "shh");
    expect(token).toEqual("rawr");
  });
});
