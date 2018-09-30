import { Context } from "koa";
import { DrawingManager } from "../../managers";
import { Server as WSServer } from "ws";
import * as url from "url";
import * as Http from "http";
import * as Http2 from "http2";
import { Socket } from "net";
import { TLSSocket } from "tls";

export class DrawingController {
  private manager: DrawingManager;
  private ws: WSServer;
  constructor(manager: DrawingManager, ws: WSServer) {
    this.manager = manager;
    this.ws = ws;
  }

  public index = async (ctx: Context) => {
    const { limit, offset } = ctx.query;

    const drawings = await this.manager.findDrawings(limit, offset);
    const url = ctx.URL.origin + ctx.URL.pathname;
    ctx.body = {
      url: ctx.URL,
      next: `${url}?limit=${limit}&offset=${offset + limit}`,
      count: drawings.length,
      drawings
    };
  };

  public upgrade(
    request: Http.ServerRequest | Http2.Http2ServerRequest,
    socket: Socket | TLSSocket,
    head: Http.IncomingHttpHeaders | Http2.IncomingHttpHeaders
  ) {
    const pathname = url.parse(request.url).pathname;
  }
}
