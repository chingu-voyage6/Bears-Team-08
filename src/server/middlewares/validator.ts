import * as Joi from "joi";

import { Middleware } from ".";
import { FieldValidationError } from "../errors";

export type SchemaMap = {
  params?: { [key: string]: Joi.SchemaLike };
  request?: {
    body?: { [key: string]: Joi.SchemaLike } | Joi.ArraySchema;
    headers?: { [key: string]: Joi.SchemaLike };
  };
  response?: {
    body?: { [key: string]: Joi.SchemaLike } | Joi.ArraySchema;
    headers?: { [key: string]: Joi.SchemaLike };
  };
};

export function validator(schema: SchemaMap): Middleware {
  return async (ctx, next) => {
    const res = Joi.validate(ctx, schema, {
      allowUnknown: true,
      abortEarly: false
    });

    const err = res.error;
    if (err) {
      throw new FieldValidationError(
        err.message,
        err.details.map(f => ({
          message: f.message,
          path: f.path,
          kind: f.type
        })),
        err
      );
    }

    await next();
  };
}
