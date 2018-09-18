import { Server, IncomingMessage, ServerResponse } from "http";
import { Http2ServerRequest, Http2ServerResponse } from "http2";

import * as Koa from "koa";
import * as Helmet from "koa-helmet";

import * as Middlewares from "./middlewares";
import { Application } from "./application";

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

  public callback(): (
    req: IncomingMessage | Http2ServerRequest,
    res: ServerResponse | Http2ServerResponse
  ) => void {
    return this.app.callback();
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

export function createServer(application: Application): AppServer {
  const app = new Koa();
  const server = new AppServer(app);

  app.use(Helmet());

  app.use(Middlewares.responseTime);
  app.use(Middlewares.logRequest(application.webLogger));
  app.use(Middlewares.errorHandler(application.errorLogger));

  // if (Config.isProduction) {
  //   // this.app.use("/", Express.static(Config.staticFiles));
  //   // this.app.use("/:drawingId", Express.static(Config.indexFile));
  // }

  for (const component of application.components) {
    component(app);
  }

  return server;
}
