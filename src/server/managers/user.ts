import { User, CreateUserJSON } from "../entities";
import { UserRepository } from "../repositories";
import { Hasher } from "../lib/crypto";
import { Authenticator } from "../lib/authentication";
import { ValidationError } from "../errors";

export class UserManager {
  private repo: UserRepository;
  private hasher: Hasher;
  private auth: Authenticator;

  constructor(repo: UserRepository, hasher: Hasher, auth: Authenticator) {
    this.repo = repo;
    this.hasher = hasher;
    this.auth = auth;
  }

  public findByUsername = async (username: string): Promise<User> => {
    return this.repo.findByUsername(username);
  };

  public findByEmail = async (email: string): Promise<User> => {
    return this.repo.findByEmail(email);
  };

  public create = async (userJSON: CreateUserJSON): Promise<User> => {
    const hashPassword = await this.hasher.hashPassword(userJSON.password);
    const user = await this.repo.insert({
      username: userJSON.username,
      firstName: userJSON.firstName,
      lastName: userJSON.lastName,
      email: userJSON.email,
      hash: hashPassword
    });
    return user;
  };

  public login = async (
    username: string,
    password: string
  ): Promise<string> => {
    const user = await this.repo.findByUsername(username);

    if (await this.hasher.verifyPassword(password, user.hash)) {
      return this.auth.signature(user);
    }

    throw new ValidationError("Wrong credentials");
  };

  public update = async (user: User): Promise<User> => {
    return this.repo.update(user);
  };

  public changePassword = async (
    username: string,
    oldPassword,
    newPassword
  ): Promise<void> => {
    const user = await this.repo.findByUsername(username);
    const validPassowrd = await this.hasher.verifyPassword(
      oldPassword,
      user.hash
    );

    if (!validPassowrd) {
      throw new ValidationError("Old password is invalid");
    }

    const hashedPassword = await this.hasher.hashPassword(newPassword);
    return this.repo.changePassword(username, hashedPassword);
  };

  public delete = async (userId: string) => {
    return this.repo.delete(userId);
  };
}
