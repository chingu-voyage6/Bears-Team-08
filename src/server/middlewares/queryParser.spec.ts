import { Middleware } from ".";
import { queryParser, QueryKind } from "./queryParser";
import { ValidationError } from "../errors";

describe("QueryParser middleware", () => {
  const next = () => {
    return Promise.resolve();
  };

  it("should correctly parse a integer", async () => {
    const middleware = queryParser({ limit: { kind: QueryKind.Number } });
    const ctx: any = {
      query: {
        limit: "10"
      }
    };

    await middleware(ctx, next);
    expect(ctx.query.limit).toEqual(10);
  });

  it("should give a default value if value is not included", async () => {
    const middleware = queryParser({
      limit: { kind: QueryKind.Number, default: 6 }
    });

    const ctx: any = { query: {} };

    await middleware(ctx, next);
    expect(ctx.query.limit).toEqual(6);
  });

  it("should throw a validation error if a required value is not included", async () => {
    const middleware = queryParser({
      limit: { kind: QueryKind.Number, required: true }
    });

    const ctx: any = { query: {} };

    expect(middleware(ctx, next)).rejects.toBeInstanceOf(ValidationError);
  });
});
