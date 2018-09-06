import { mock, instance, verify, when, reset, anything } from "ts-mockito";

import { Authenticator, JWTAuthenticator } from "../lib/authentication";
import { BCryptHasher } from "../lib/crypto";
import { User } from "../entities";
import { UserManager } from "./user";
import { UserRepository } from "../repositories";
import { ValidationError } from "../errors";
import { Role } from "@shared/contract";

describe("UserManager", async () => {
  let MockHasher: BCryptHasher;
  let MockAuth: Authenticator;
  let MockUserRepo: UserRepository;
  let manager: UserManager;

  const user = {
    username: "jack",
    hash: "$2b$08$Ozpshai8lfh.UvIM2mphHeGYY9p1xsNHYG4nFzpDfIQfSbODSYHOm",
    firstName: "jack",
    lastName: "rabbit",
    role: Role.user,
    email: "jack@example.com"
  };

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
    when(MockUserRepo.findByUsername("jack")).thenResolve(user);
    when(MockHasher.verifyPassword("shh", user.hash)).thenResolve(true);
    when(MockAuth.signature(anything())).thenReturn("token");

    const token = await manager.login("jack", "shh");
    expect(token).toEqual("token");
  });

  it("should not login a user with invalid credentials", async () => {
    when(MockUserRepo.findByUsername("jack")).thenResolve(user);

    expect(manager.login("jack", "bad password")).rejects.toBeInstanceOf(
      ValidationError
    );
  });

  it("should be able to create a new user", async () => {
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
