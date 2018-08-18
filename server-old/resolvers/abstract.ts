import { Context } from "../context";

export class AbstractResolver {
  constructor(private getContext: () => Promise<Context>) {}
  protected get ctx(): Promise<Context> {
    return this.getContext();
  }
}
