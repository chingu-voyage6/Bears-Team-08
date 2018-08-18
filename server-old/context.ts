import * as Resolvers from "./resolvers";
import { Response } from "express";

export class Context {
  user?: any;
  constructor(db: any, res: Response, req: any) {
    this.user = (res as any).user;
  }
}
