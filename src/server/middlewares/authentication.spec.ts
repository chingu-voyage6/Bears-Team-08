import { mock, instance, verify, when, reset } from "ts-mockito";

import { Authenticator, JWTAuthenticator } from "../lib/authentication";
import { Middleware } from ".";
import { Role } from "@shared/contract";
import { UnauthorizedError } from "../errors";
import { authentication } from "./authentication";

describe("Authentication middleware", () => {
  let MockAuthenticator: Authenticator;
  let middleware: Middleware;

  beforeEach(() => {
    MockAuthenticator = mock(JWTAuthenticator);
    middleware = authentication(instance(MockAuthenticator));
  });

  afterEach(() => {
    reset(MockAuthenticator);
  });

  it("should set context with the user data", async () => {
    const user = {
      username: "jack",
      hash: "$2b$08$Ozpshai8lfh.UvIM2mphHeGYY9p1xsNHYG4nFzpDfIQfSbODSYHOm",
      firstName: "jack",
      lastName: "rabbit",
      role: Role.user,
      email: "jack@example.com"
    };

    const token = "abc123";
    when(MockAuthenticator.validate(token)).thenResolve(user);

    const ctx: any = {
      headers: {
        authorization: `Bearer ${token}`
      },
      state: {}
    };

    let nextCalled = false;
    const next = () => {
      nextCalled = true;
      return Promise.resolve();
    };

    await middleware(ctx, next);

    verify(MockAuthenticator.validate(token)).called();
    expect(ctx.state.user).toEqual(user);
    expect(nextCalled).toBe(true);
  });

  it("should throw UnauthorizedError with invalid token", async () => {
    const token = "abc123";
    const ctx: any = {
      headers: {
        authorization: `Bearer ${token}`
      },
      state: {}
    };

    when(MockAuthenticator.validate(token)).thenReject(new UnauthorizedError());

    let nextCalled = false;
    const next = () => {
      nextCalled = true;
      return Promise.resolve();
    };

    expect(middleware(ctx, next)).rejects.toBeInstanceOf(UnauthorizedError);
    verify(MockAuthenticator.validate(token)).called();
    expect(nextCalled).toBe(false);
  });
});
