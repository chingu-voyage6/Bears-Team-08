import { RoleKind } from "@shared/contract";
import { User } from "../entities";
import { Database } from "../lib/database";
import { NotFoundError, ValidationError } from "../errors";
import { uuidv4 } from "../lib/crypto";

export type SqlUser = {
  id?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  hash?: string;
  email?: string;
  role?: RoleKind;
  created_at?: Date;
  updated_at?: Date;
};

export class UserRepository {
  private readonly TABLE: string = "user";
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public async find(limit: number = 10, offset: number = 0): Promise<User[]> {
    const conn = await this.db.getConnection();
    const users = await conn
      .table(this.TABLE)
      .orderBy("username")
      .limit(limit)
      .offset(offset);
    return users.map(this.transform);
  }

  public async findByUsername(username: string): Promise<User> {
    const conn = await this.db.getConnection();
    const user = await conn
      .table(this.TABLE)
      .where({ username })
      .first();

    if (!user) {
      throw new NotFoundError(user);
    }

    return this.transform(user);
  }

  public async findByEmail(email: string): Promise<User> {
    const conn = await this.db.getConnection();
    const user = await conn
      .table(this.TABLE)
      .where({ email })
      .first();

    if (!user) {
      throw new NotFoundError(user);
    }

    return this.transform(user);
  }

  public async insert(user: User): Promise<User> {
    const now = new Date();

    const conn = await this.db.getConnection();
    const rawUser: SqlUser = {};

    const sqlUser: SqlUser = {
      id: uuidv4(),
      username: user.username,
      hash: user.hash,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      role: user.role || RoleKind.user,
      created_at: now,
      updated_at: now
    };

    try {
      const res = await conn
        .table(this.TABLE)
        .insert(sqlUser)
        .returning("*");
      return this.transform(res[0]);
    } catch (err) {
      if (
        err.constraint === "user_username_unique" ||
        err.code === "SQLITE_CONSTRAINT"
      ) {
        throw new ValidationError(
          `User "${user.username}" already exists`,
          err
        );
      }

      throw err;
    }
  }

  public async update(user: User): Promise<User> {
    const now = new Date();
    user.updatedAt = now;

    const conn = await this.db.getConnection();
    const res = await conn
      .table(this.TABLE)
      .update({
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        role: user.role,
        updated_at: now
      })
      .where("username", user.username);

    user = await this.findByUsername(user.username);
    return user;
  }

  public async changePassword(
    username: string,
    newPasswordHash: string
  ): Promise<void> {
    const conn = await this.db.getConnection();

    await conn
      .table(this.TABLE)
      .update({ hash: newPasswordHash, updated_at: new Date() })
      .where("username", username);
  }

  public async delete(userId: string): Promise<void> {
    const trx = await this.db.getTransaction();

    try {
      await trx
        .from(this.TABLE)
        .delete()
        .where({ id: userId });

      await trx.commit();
    } catch (err) {
      trx.rollback(err);
      throw err;
    }
  }

  private transform(row: SqlUser): User {
    return {
      id: row.id,
      email: row.email,
      username: row.username,
      firstName: row.first_name,
      lastName: row.last_name,
      hash: row.hash,
      role: row.role,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at)
    };
  }
}

export default UserRepository;
