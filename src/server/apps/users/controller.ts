import { Context } from "koa";
import { AuthUserJSON } from "@shared/contract";
import { User } from "../../entities";
import { Authenticator } from "../../lib/authentication";
import { UserManager } from "../../managers";
import { CreateUser, UserModel } from "./model";

export class UserController {
  private manager: UserManager;

  constructor(manager: UserManager) {
    this.manager = manager;
  }

  public async create(ctx: Context) {
    const createUserJSON = ctx.request.body;
    const newUser = await this.manager.create(createUserJSON as CreateUser);

    ctx.body = new UserModel(newUser);
    ctx.status = 201;
    ctx.set("location", "/api/v1/users/me");
  }

  public login = async (ctx: Context) => {
    const body = ctx.request.body as { [key: string]: string };
    const username = body.username;
    const password = body.password;
    ctx.body = {
      accessToken: await this.manager.login(username, password)
    };
  };

  public update = async (ctx: Context) => {};

  public changePassword = async (ctx: Context) => {};

  public get = async (ctx: Context) => {};

  public delete = async (ctx: Context) => {};
}
