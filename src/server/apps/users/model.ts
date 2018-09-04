import { User } from "../../entities";

export interface CreateUser {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export class UserModel {
  public id: string;
  public email: string;
  public username: string;
  public firstName: string;
  public lastName: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
