import { UserJSON, Role } from "@shared/contract";

export type User = UserJSON & {
  hash?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
