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
  email?: string;
  role?: Role;
}
