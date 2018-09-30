// type information that is shared between the client and server

export type ID = string;

export interface UserJSON {
  id?: ID;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: RoleKind;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum RoleKind {
  user = "user",
  admin = "admin"
}

export interface AuthUserJSON {
  token: string;
  user: UserJSON;
}

export interface CreateUserJSON {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginUserJSON {
  username: string;
  password: string;
}

export interface DrawingJSON {
  id: ID;
  name: string;
  width: number;
  height: number;
  owner: UserJSON | ID;
  contributors: UserJSON[] | ID[];
  paints: PaintJSON[];
  createdAt?: Date;
  updatedAt?: Date;
}

export enum PaintKind {
  Freehand = "FREEHAND",
  Line = "LINE",
  Image = "IMAGE",
  Erase = "ERASE"
}

export type PaintJSON = {
  kind: PaintKind;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  displayed: boolean;
  [key: string]: any;
};
