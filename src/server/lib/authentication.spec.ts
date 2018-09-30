import { mock, instance, verify, when } from "ts-mockito";

import { RoleKind } from "@shared/contract";
import { JWTAuthenticator } from "./authentication";
import { User } from "../entities";
import { UserRepository } from "../repositories/user";

describe("JWTAuthenticator", () => {
  let MockUserRepository: UserRepository;
  let auth: JWTAuthenticator;
  const user: User = {
    id: "6a543599-02bd-4776-aaec-391579e6f3cf",
    username: "jack",
    email: "jack@example.com",
    role: RoleKind.user
  };

  beforeEach(() => {
    MockUserRepository = mock(UserRepository);
    auth = new JWTAuthenticator(instance(MockUserRepository), "superSecret", {
      noTimestamp: true
    });
  });

  it("should validate a token", async () => {
    when(MockUserRepository.findByUsername("jack")).thenReturn(
      Promise.resolve(user)
    );

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNTQzNTk5LTAyYmQtNDc3Ni1hYWVjLTM5MTU3OWU2ZjNjZiIsInVzZXJuYW1lIjoiamFjayIsInJvbGUiOiJ1c2VyIn0.lH95MMkBcOpso8puM4Uh71DO6QjG6bH3Y6wztUtvZl0";

    expect(await auth.validate(token)).toEqual(user);
    verify(MockUserRepository.findByUsername("jack")).called();
  });

  it("should generate a valid token for a user", async () => {
    const token = auth.signature(user);
    const expectdToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNTQzNTk5LTAyYmQtNDc3Ni1hYWVjLTM5MTU3OWU2ZjNjZiIsInVzZXJuYW1lIjoiamFjayIsInJvbGUiOiJ1c2VyIn0.lH95MMkBcOpso8puM4Uh71DO6QjG6bH3Y6wztUtvZl0";

    expect(token).toEqual(expectdToken);
  });
});
