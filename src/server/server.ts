import * as Http from "http";
import * as Http2 from "http2";
import * as Https from "https";

import * as Koa from "koa";
import * as Cors from "koa-cors";
import * as Helmet from "koa-helmet";

import * as Middlewares from "./middlewares";
import { Application } from "./application";

export interface AppServerOptions {
  origin?: string;
  https?: boolean;
  key?: Buffer;
  cert?: Buffer;
}

export class AppServer {
  public readonly app: Koa;
  public readonly server: Http.Server | Http2.Http2Server;

  constructor(app: Koa, opts?: AppServerOptions) {
    this.app = app;

    if (opts.https) {
      this.server = Https.createServer(
        { key: opts.key, cert: opts.cert },
        this.app.callback()
      );
    } else {
      this.server = Http.createServer(this.app.callback());
    }
  }

  public listen(
    port: number,
    cb?: () => void
  ): Http.Server | Http2.Http2Server {
    return this.server.listen(port, cb);
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

export function createServer(
  application: Application,
  opts: AppServerOptions
): AppServer {
  const app = new Koa();
  const appServer = new AppServer(app, opts);

  app.use(Helmet());
  app.use(Cors({ origin: opts.origin || "*" }));

  app.use(Middlewares.responseTime);
  app.use(Middlewares.logRequest(application.webLogger));
  app.use(Middlewares.errorHandler(application.errorLogger));

  // if (Config.isProduction) {
  //   // this.app.use("/", Express.static(Config.staticFiles));
  //   // this.app.use("/:drawingId", Express.static(Config.indexFile));
  // }

  for (const mod of application.modules) {
    mod(appServer);
  }

  return appServer;
}
