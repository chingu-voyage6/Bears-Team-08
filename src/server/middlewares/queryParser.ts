import { Middleware } from ".";
import { ValidationError } from "../errors";

export enum QueryKind {
  Integer = "integer",
  Number = "number",
  String = "string"
}

export type QueryOptions = {
  kind: QueryKind;
  default?: any;
  required?: boolean;
  min?: number;
  max?: number;
};

export type QsSchema = {
  [key: string]: QueryOptions;
};

export function queryParser(schema: QsSchema): Middleware {
  return async (ctx, next) => {
    for (const key in schema) {
      if (schema.hasOwnProperty(key)) {
        const info = schema[key];
        const q = ctx.query[key];

        if (!q && info.required) {
          throw new ValidationError(`Query parameter "${key}" is required`);
        }

        if (!q) {
          ctx.query[key] = info.default;
          continue;
        }

        switch (info.kind) {
          case QueryKind.Integer:
          case QueryKind.Number: {
            const n =
              info.kind === QueryKind.Integer
                ? Number.parseInt(q)
                : Number.parseFloat(q);

            if (isNaN(n)) {
              throw new ValidationError(
                `"${key}" must be a valid ${info.kind}`
              );
            }

            if (info.max && n > info.max) {
              ctx.query[key] = info.max;
            } else if (info.min && n < info.min) {
              ctx.query[key] = info.min;
            } else {
              ctx.query[key] = n;
            }
            break;
          }
          case QueryKind.String: {
            ctx.query[key] = q;
            break;
          }
        }
      }
    }
    await next();
  };
}
