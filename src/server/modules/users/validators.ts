import * as Joi from "joi";

export const createUser: Joi.SchemaMap = {
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string()
    .email()
    .trim(),
  firstName: Joi.string(),
  lastName: Joi.string()
};
