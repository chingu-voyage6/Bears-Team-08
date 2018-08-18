import { Context } from "../context";
import { UserResolver } from "./user";
import { DrawingResolver } from "./drawing";
import { AuthResolver } from "./auth";

export type Resolver = {
  User: UserResolver;
  Drawing: DrawingResolver;
  Auth: AuthResolver;
};

export const getResolver = (ctx: () => Context): Resolver => {
  return {
    User: new UserResolver(ctx),

    Drawing: new DrawingResolver(ctx),
    Auth: new AuthResolver(ctx)
  };
};
