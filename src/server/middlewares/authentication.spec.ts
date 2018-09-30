import { mock, instance, verify, when, reset } from "ts-mockito";

import { Authenticator, JWTAuthenticator } from "../lib/authentication";
import { Middleware } from ".";
import { RoleKind } from "@shared/contract";
import { UnauthorizedError } from "../errors";
import { authentication } from "./authentication";
import { users as testUsers } from "../testUtil";

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
    const user = testUsers[0];

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
