// type information that is shared between the client and server

export interface UserJSON {
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: Role;
}

export enum Role {
  user = "user",
  admin = "admin"
}

export interface AuthUserJSON {
  id?: string;
  username?: string;
  role?: Role;
}

export interface CreateUser {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}
