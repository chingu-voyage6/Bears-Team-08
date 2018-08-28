import { Server } from "http";

import * as Koa from "koa";
import * as Helmet from "koa-helmet";

import * as Config from "./config";
import * as Middlewares from "./middlewares";
import { Logger } from "./lib/logger";
import { Database } from "./lib/database";
import { UserManager } from "./managers";
import { UserRepository } from "./repositories";

export type AppContainer = {
  db: Database;
  webLogger: Logger;
  repositories: {
    user: UserRepository;
  };
  managers: {
    user: UserManager;
  };
};

export const createAppContainer = (
  db: Database,
  webLogger: Logger
): AppContainer => {
  const userRepo = new UserRepository(db);

  return {
    db,
    webLogger,
    repositories: {
      user: userRepo
    },
    managers: {
      user: new UserManager(userRepo)
    }
  };
};

export class AppServer {
  private app: Koa;
  private server: Server;

  constructor(app: Koa) {
    this.app = app;
    // this.db = args.db;
    // this.logger = args.logger;

    // this.app = Express();
    // this.app.use(bodyParser.urlencoded({ extended: false })); // allow data from a post
    // this.app.use(bodyParser.json());
    // this.app.use(Config.baseRoute, routes);
    // if (Config.isProduction) {
    //   this.app.use("/", Express.static(Config.staticFiles));
    //   this.app.use("/:drawingId", Express.static(Config.indexFile));
    // }
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

export function createServer(args: AppContainer): AppServer {
  const app = new Koa();
  const server = new AppServer(app);

  app.use(Helmet());
  app.use(Middlewares.responseTime);
  app.use(Middlewares.logRequest(args.webLogger));
  app.use(Middlewares.errorHandler(args.webLogger));

  if (Config.isProduction) {
    // this.app.use("/", Express.static(Config.staticFiles));
    // this.app.use("/:drawingId", Express.static(Config.indexFile));
  }

  return server;
}
