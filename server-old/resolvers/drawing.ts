import { AbstractResolver } from "./abstract";
import { Context } from "../context";

export class DrawingResolver extends AbstractResolver {
  getById = (id): Promise<any> => {
    return Promise.reject("not implemented");
  };
}
