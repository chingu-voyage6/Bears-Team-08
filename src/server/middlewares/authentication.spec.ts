import * as sinon from "sinon";

import { Role } from "@shared/contract";
import { authentication } from "./authentication";
import { UnauthorizedError } from "../errors";

describe("authentication", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it("should set context with the user data", async () => {
    const ctx: any = {
      headers: {
        authorization: "jwt token"
      },
      state: {}
    };

    const fakeAuthenticator: any = {
      validate: sandbox.stub().returns({
        username: "admin",
        role: Role.admin
      })
    };

    const authenticationMiddleware = authentication(fakeAuthenticator);

    const spy = sandbox.spy();
    await authenticationMiddleware(ctx, spy);

    expect(fakeAuthenticator.validate.calledOnce).toBe(true);
    expect(ctx.state.user).toEqual({
      username: "admin",
      role: Role.admin
    });

    expect(spy.calledOnce).toBe(true);
  });

  it("should throw UnauthorizedError", async () => {
    const ctx: any = {
      headers: {
        authorization: "jwt token"
      },
      state: {}
    };

    const fakeAuthenticator: any = {
      validate: sandbox.stub().throws(new UnauthorizedError())
    };

    const spy = sandbox.spy();
    const authenticationMiddleware = authentication(fakeAuthenticator);

    expect(authenticationMiddleware(ctx, spy)).rejects.toBeInstanceOf(
      UnauthorizedError
    );
    expect(fakeAuthenticator.validate.calledOnce).toBe(true);
    expect(spy.calledOnce).toBe(false);
  });
});
