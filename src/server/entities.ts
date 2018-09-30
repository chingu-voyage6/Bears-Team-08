import { UserJSON } from "@shared/contract";

export * from "@shared/contract";

export type User = UserJSON & {
  hash?: string;
};
