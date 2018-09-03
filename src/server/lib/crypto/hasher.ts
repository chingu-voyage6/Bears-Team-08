import * as Bcrypt from "bcrypt";

export interface Hasher {
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, hash: string): Promise<boolean>;
}

export class BCryptHasher implements Hasher {
  public readonly difficulty: number;
  constructor(difficulty: number = 10) {
    this.difficulty = difficulty;
  }

  public async hashPassword(password: string): Promise<string> {
    const salt = await Bcrypt.genSalt(this.difficulty);
    const hash = await Bcrypt.hash(password, salt);
    return hash;
  }

  public async verifyPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return Bcrypt.compare(password, hash);
  }
}
