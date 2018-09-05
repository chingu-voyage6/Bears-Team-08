import * as Jwt from "jsonwebtoken";

import * as Config from "../config";
import { AuthUserJSON } from "@shared/contract";
import { User } from "../entities";
import { UserRepository } from "../repositories";
import { UnauthorizedError } from "../errors";

export interface Authenticator {
  validate(token: string): Promise<User>;
  signature(user: User): string;
}

export type JWTAuthenticatorOptions = Jwt.SignOptions & {};

export class JWTAuthenticator implements Authenticator {
  private userRepo: UserRepository;
  private secret: string;
  private options: JWTAuthenticatorOptions;

  constructor(
    userRepo: UserRepository,
    secretKey: string,
    options?: JWTAuthenticatorOptions
  ) {
    this.userRepo = userRepo;
    this.secret = secretKey;
    this.options = options;
  }

  public async validate(token: string): Promise<User> {
    try {
      const decode = Jwt.verify(token, this.secret) as AuthUserJSON;
      const user = await this.userRepo.findByUsername(decode.username);

      return user;
    } catch (err) {
      throw new UnauthorizedError(err);
    }
  }

  public signature(user: User): string {
    return Jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      this.secret,
      this.options
    );
  }
}
