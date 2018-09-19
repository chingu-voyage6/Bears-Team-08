// type information that is shared between the client and server

export interface UserJSON {
  id?: string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
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

export interface CreateUserJSON {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface DrawingJSON {
  id: string;
  name: string;
  width: number;
  height: number;
  owner: UserJSON | string;
  contributors: UserJSON[] | string[];
}
