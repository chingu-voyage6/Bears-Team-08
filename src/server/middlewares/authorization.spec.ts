import { Middleware } from ".";
import { authorization } from "./authorization";
import { Role } from "../entities";
import { ForbiddenError } from "../errors";

describe("Authorization middleware", () => {
  let middleware: Middleware;

  const user = {
    username: "jack",
    hash: "$2b$08$Ozpshai8lfh.UvIM2mphHeGYY9p1xsNHYG4nFzpDfIQfSbODSYHOm",
    firstName: "jack",
    lastName: "rabbit",
    role: Role.user,
    email: "jack@example.com"
  };

  beforeEach(() => {
    middleware = authorization([]);
  });

  it("should reject when user is not authorized", () => {
    const middleware = authorization([Role.admin]);

    const ctx: any = {
      state: {
        user
      }
    };

    expect(middleware(ctx, () => Promise.resolve())).rejects.toBeInstanceOf(
      ForbiddenError
    );
  });

  it("should do nothing if authorized", async () => {
    const middleware = authorization([Role.user]);

    const ctx: any = {
      state: {
        user
      }
    };
    let nextCalled = false;
    const next = () => {
      nextCalled = true;
      return Promise.resolve();
    };

    await middleware(ctx, next);
    expect(nextCalled).toBe(true);
  });
});
