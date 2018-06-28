import { Point } from "./point";

export enum PaintKind {
  Freehand = "FREEHAND",
  Line = "LINE",
  Image = "IMAGE",
  Erase = "ERASE"
}

export type PaintJSON = {
  kind: PaintKind;
  [key: string]: any;
};

export interface Paint {
  readonly kind: PaintKind;
  draw: (ctx: CanvasRenderingContext2D) => void;
  toJSON: () => PaintJSON;
}

export class FreehandPaint implements Paint {
  private _points: Point[] = [];
  static fromJSON(json: PaintJSON): FreehandPaint {
    const freehand = new FreehandPaint();
    const points = json.points;
    points.forEach(point => freehand.addPoint(point));
    return freehand;
  }

  constructor(public readonly lineWidth = 5) {
    // new Path2D()
  }

  public get kind() {
    return PaintKind.Freehand;
  }

  public addPoint(point: Point) {
    this._points.push(point);
  }

  public popPoint(): Point {
    return this._points.pop();
  }

  public toJSON(): PaintJSON {
    return {
      kind: this.kind
    };
  }

  public get points() {
    return this._points.map(point => point);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "#df4b26";
    ctx.lineJoin = "round";
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();
    this.points.map((point, i) => {
      ctx.beginPath();
      const { offsetLeft, offsetTop } = ctx.canvas;
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        const lastPoint = this.points[i - 1];
        ctx.moveTo(lastPoint.x, lastPoint.y);
      }
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    });
  }
}

export class LinePaint implements Paint {
  public kind = PaintKind.Erase;
  public draw(context: CanvasRenderingContext2D) {}

  public toJSON(): PaintJSON {
    return {
      kind: this.kind
    };
  }
}

export class ImagePaint implements Paint {
  public kind = PaintKind.Image;
  public draw(context: CanvasRenderingContext2D) {}

  public toJSON(): PaintJSON {
    return {
      kind: this.kind
    };
  }
}

export class ErasePaint implements Paint {
  public kind = PaintKind.Erase;
  public draw(context: CanvasRenderingContext2D) {}

  public toJSON(): PaintJSON {
    return {
      kind: this.kind
    };
  }
}
