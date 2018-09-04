import { User } from "../entities";
import { UserRepository } from "./user";
import { TestDatabase, Database } from "../lib/database";

describe("User Repository", () => {
  let database: Database;
  let repo: UserRepository;

  beforeEach(async () => {
    database = new TestDatabase();
    repo = new UserRepository(database);
    await database.migrateLatest();
    await database.seed();
  });

  afterEach(async () => {
    await database.rollback();
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
    const user = {
      username: "jlrickert",
      email: "jlrickert@example.com",
      first_name: "Jared",
      last_name: "Rickert"
    };
  });
  it("should not be able to insert a new user with a preexisting username", async () => {});
});
