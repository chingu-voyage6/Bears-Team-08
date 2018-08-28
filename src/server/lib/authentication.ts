import * as Jwt from "jsonwebtoken";

import * as Config from "../config";
import { UserJSON, AuthUserJSON } from "@shared/contract";
import { UserRepository } from "../repositories";
import { UnauthorizedError } from "../errors";

export interface Authenticator {
  validate(token: string): Promise<AuthUserJSON>;
  authenticate(user: UserJSON): string;
}

export class JWTAuthenticator implements Authenticator {
  private userRepo: UserRepository;
  private secret: string;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
    this.secret = Config.secretKey;
  }

  public async validate(token: string): Promise<AuthUserJSON> {
    try {
      const decode: any = Jwt.verify(token, this.secret);
      const user = await this.userRepo.findByEmail(decode.email);

      return user;
    } catch (err) {
      throw new UnauthorizedError(err);
    }
  }

  public authenticate(user: UserJSON): string {
    return Jwt.sign(
      { id: user.id, email: user.username, role: user.role },
      this.secret,
      {
        expiresIn: 60 * 60
      }
    );
  }
}
