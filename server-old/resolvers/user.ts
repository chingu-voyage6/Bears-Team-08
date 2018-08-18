import { AbstractResolver } from "./abstract";
import { Context } from "../context";

export class AuthResolver extends AbstractResolver {
  getById = (id, ctx: Context): Promise<any> => {
    return Promise.reject("not implemented");
  };
}
