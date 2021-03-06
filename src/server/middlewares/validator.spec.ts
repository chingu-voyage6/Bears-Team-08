import * as Joi from "joi";
import { validator } from "./validator";
import { FieldValidationError } from "../errors";

describe("Validator middleware", () => {
  it("should throw error if required value is missing", async () => {
    const middleware = validator("Error message", {
      request: {
        body: {
          username: Joi.string().required(),
          password: Joi.string().required()
        }
      }
    });
    let nextCalled = false;
    const next = async () => {
      nextCalled = true;
    };

    const ctx: any = {
      request: {
        body: {
          username: "jack"
        }
      }
    };

    const res = middleware(ctx, next);
    expect(res).rejects.toBeInstanceOf(FieldValidationError);
    expect(nextCalled).toBe(false);
  });
});
