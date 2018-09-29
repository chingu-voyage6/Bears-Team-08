// type information that is shared between the client and server

export type Id = string;

export interface UserJSON {
  id?: Id;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  role?: RoleKind;
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
  id: Id;
  name: string;
  width: number;
  height: number;
  owner: UserJSON | Id;
  contributors: UserJSON[] | Id[];
  paints: PaintJSON[];
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
