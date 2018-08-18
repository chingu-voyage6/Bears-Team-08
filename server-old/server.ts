import { Context } from "./context";

export type ServerProps = {
  resolvers: any;
  getContext: () => Context | Promise<Context>;
};

export type ServerConfig = {
  port?: number;
  secretKey?: string;
  conn: any;
};

export type ServerOptions = {};

export class Server {
  public static newWithDefaults(): Server {
    return new Server();
  }
  constructor() {}

  public listen(fn?: (port: number) => void) {
    if (fn) {
      fn(3000);
    }
  }

  public stop(fn?: () => void) {
    if (fn) {
      fn();
    }
  }
}
