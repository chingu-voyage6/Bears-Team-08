import { AbstractResolver } from "./abstract";
import { Context } from "../context";

export class AuthResolver extends AbstractResolver {
  getByUsername = async (username): Promise<any> => {
    this.ctx;
    return Promise.reject("not implemented");
  };
}
