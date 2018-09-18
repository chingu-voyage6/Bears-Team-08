import { mock, instance, verify, when, reset, anything } from "ts-mockito";

import { Authenticator, JWTAuthenticator } from "../lib/authentication";
import { BCryptHasher } from "../lib/crypto";
import { User } from "../entities";
import { UserManager } from "./user";
import { UserRepository } from "../repositories";
import { ValidationError } from "../errors";
import { Role } from "../entities";
import { users as testUsers } from "../testUtil";

describe("UserManager", async () => {
  let MockHasher: BCryptHasher;
  let MockAuth: Authenticator;
  let MockUserRepo: UserRepository;
  let manager: UserManager;

  beforeEach(async () => {
    MockHasher = mock(BCryptHasher);
    MockUserRepo = mock(UserRepository);
    MockAuth = mock(JWTAuthenticator);
    manager = new UserManager(
      instance(MockUserRepo),
      instance(MockHasher),
      instance(MockAuth)
    );
  });

  afterEach(() => {
    [MockAuth, MockUserRepo, MockHasher].map(reset);
  });

  it("should be able to login a user with valid credentials", async () => {
    const user = testUsers[0];
    when(MockUserRepo.findByUsername(user.username)).thenResolve(user);
    when(MockHasher.verifyPassword("shh", user.hash)).thenResolve(true);
    when(MockAuth.signature(anything())).thenReturn("token");

    const token = await manager.login(user.username, "shh");
    expect(token).toEqual("token");
  });

  it("should not login a user with invalid credentials", async () => {
    const user = testUsers[0];
    when(MockUserRepo.findByUsername(user.username)).thenResolve(user);

    expect(manager.login(user.username, "bad password")).rejects.toBeInstanceOf(
      ValidationError
    );
  });

  it("should be able to create a new user", async () => {
    const user = testUsers[0];
    const insertedUser: User = {
      ...user,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const userPassword = "shh";
    const createUser = {
      username: user.username,
      password: userPassword
    };

    when(MockUserRepo.insert(anything())).thenResolve(insertedUser);
    when(MockHasher.hashPassword(anything())).thenResolve(user.hash);

    const newUser = await manager.create(createUser);
    verify(MockHasher.hashPassword(userPassword)).called();
    verify(MockUserRepo.insert(anything())).called();
    expect(newUser).toEqual(insertedUser);
    expect(newUser.hash).not.toEqual(userPassword);
  });
});
