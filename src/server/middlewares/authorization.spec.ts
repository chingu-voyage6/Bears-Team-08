import { Middleware } from ".";
import { authorization } from "./authorization";
import { RoleKind } from "../entities";
import { ForbiddenError } from "../errors";
import { users } from "../testUtil";

describe("Authorization middleware", () => {
  let middleware: Middleware;

  beforeEach(() => {
    middleware = authorization([]);
  });

  it("should reject when user is not authorized", () => {
    const middleware = authorization([RoleKind.admin]);

    const ctx: any = {
      state: {
        user: users[0]
      }
    };

    expect(middleware(ctx, () => Promise.resolve())).rejects.toBeInstanceOf(
      ForbiddenError
    );
  });

  it("should do nothing if authorized", async () => {
    const middleware = authorization([RoleKind.user]);

    const ctx: any = {
      state: {
        user: users[0]
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
