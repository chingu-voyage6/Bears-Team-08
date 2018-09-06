import { Server } from "http";

import * as Koa from "koa";
import * as Helmet from "koa-helmet";

import * as Config from "./config";
import * as Middlewares from "./middlewares";
import { Logger } from "./lib/logger";
import { Database } from "./lib/database";
import { UserManager } from "./managers";
import { UserRepository } from "./repositories";
import * as Apps from "./apps";
import { BCryptHasher } from "./lib/crypto";
import { Authenticator, JWTAuthenticator } from "./lib/authentication";

export type ServiceContainer = {
  db: Database;
  webLogger: Logger;
  repositories: {
    user: UserRepository;
  };
  managers: {
    user: UserManager;
  };
  lib: {
    authenticator: Authenticator;
    hasher: BCryptHasher;
  };
};

export const createServiceContainer = (
  db: Database,
  webLogger: Logger
): ServiceContainer => {
  const userRepo = new UserRepository(db);
  const authenticator = new JWTAuthenticator(userRepo, Config.secretKey, {
    expiresIn: "30m"
  });
  const hasher = new BCryptHasher(10);

  return {
    db,
    webLogger,
    repositories: {
      user: userRepo
    },
    lib: {
      authenticator,
      hasher
    },
    managers: {
      user: new UserManager(userRepo, hasher, authenticator)
    }
  };
};

export class AppServer {
  private app: Koa;
  private server: Server;

  constructor(app: Koa) {
    this.app = app;
  }

  public listen(port: number, cb?: () => void): Server {
    this.server = this.app.listen(port, cb);
    return this.server;
  }

  public get getServer() {
    return this.server;
  }

  public closeServer(): Promise<void> {
    if (this.server === undefined) {
      throw new Error("Server is not initialized.");
    }

    let attempts = 10;
    const attemptClose = async (resolve, reject) => {
      this.server.getConnections((err, pendingRequests) => {
        if (err) {
          this.server.close(() => reject(err));
          return;
        } else if (pendingRequests > 0) {
          attempts -= 1;
        } else {
          this.server.close(() => resolve());
          return;
        }
        if (attempts <= 0) {
          this.server.close(() => reject(err));
        }
        setTimeout(attemptClose, 1000);
      });
    };

    return new Promise<void>(async (resolve, reject) => {
      await attemptClose(resolve, reject);
    });
  }
}

export function createServer(container: ServiceContainer): AppServer {
  const app = new Koa();
  const server = new AppServer(app);

  app.use(Helmet());
  app.use(Middlewares.responseTime);
  app.use(Middlewares.logRequest(container.webLogger));
  app.use(Middlewares.errorHandler(container.webLogger));

  if (Config.isProduction) {
    // this.app.use("/", Express.static(Config.staticFiles));
    // this.app.use("/:drawingId", Express.static(Config.indexFile));
  }

  Apps.initUsers(app, container);
  Apps.initDrawing(app, container);

  return server;
}
