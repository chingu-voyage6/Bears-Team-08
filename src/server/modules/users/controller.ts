import { Context } from "koa";
import { User, CreateUserJSON, AuthUserJSON } from "../../entities";
import { Authenticator } from "../../lib/authentication";
import { UserManager } from "../../managers";

export class UserController {
  private manager: UserManager;

  constructor(manager: UserManager) {
    this.manager = manager;
  }

  public index = async (ctx: Context) => {
    const { limit, offset } = ctx.query;

    const users = await this.manager.findUsers(limit, offset);
    const url = ctx.URL.origin + ctx.URL.pathname;
    ctx.body = {
      url: ctx.URL,
      next: `${url}?limit=${limit}&offset=${offset + limit}`,
      count: users.length,
      users
    };
  };

  public create = async (ctx: Context) => {
    const createUserJSON = ctx.request.body;
    const newUser = await this.manager.create(createUserJSON as CreateUserJSON);

    ctx.body = {
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      createdAt: newUser.createdAt,
      role: newUser.role
    } as User;
    ctx.status = 201;
    ctx.set("location", "/api/v1/users/me");
  };

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

  public me = async (ctx: Context) => {
    ctx.status = 200;
    ctx.body = {
      user: ctx.state.user
    };
  };

  public delete = async (ctx: Context) => {};
}
