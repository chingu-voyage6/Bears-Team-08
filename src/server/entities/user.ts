export * from "@shared/contract";
import { UserJSON } from "@shared/contract";

export type User = UserJSON & {
  hash?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
