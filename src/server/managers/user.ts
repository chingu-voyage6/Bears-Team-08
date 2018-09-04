import { User } from "../entities";
import { UserRepository } from "../repositories";
import { Hasher } from "../lib/crypto";
import { Authenticator } from "../lib/authentication";
import { CreateUser } from "../apps/users/model";

export class UserManager {
  private repo: UserRepository;
  private hasher: Hasher;
  private auth: Authenticator;

  constructor(repo: UserRepository, hasher: Hasher, auth: Authenticator) {
    this.repo = repo;
    this.hasher = hasher;
    this.auth = auth;
  }

  public async findByUsername(username: string): Promise<User> {
    return this.repo.findByUsername(username);
  }

  public async findByEmail(email: string): Promise<User> {
    return this.repo.findByEmail(email);
  }

  public async create(userJSON: CreateUser): Promise<User> {
    const hashPassword = await this.hasher.hashPassword(userJSON.password);
    return null;
  }

  public async login(username: string, password: string): Promise<any> {
    return null;
  }
}
