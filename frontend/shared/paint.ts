import { Point } from "./point";

export enum PaintKind {
  Freehand = "FREEHAND",
  Line = "LINE",
  Image = "IMAGE",
  Erase = "ERASE"
}

export type PaintJSON = {
  kind: PaintKind;
  display: boolean;
  [key: string]: any;
};

export abstract class Paint {
  public static fromJSON(json: PaintJSON): Paint {
    switch (json.kind) {
      case PaintKind.Freehand:
        return PaintFreehand.fromJSON(json);
      case PaintKind.Line:
        return PaintLine.fromJSON(json);
      case PaintKind.Image:
        return PaintImage.fromJSON(json);
      case PaintKind.Erase:
        return PaintErase.fromJSON(json);
    }
  }

  readonly kind: PaintKind;
  private _display: boolean = true;
  public abstract draw(ctx: CanvasRenderingContext2D);
  public abstract toJSON(): PaintJSON;

  constructor() {}

  public get display(): boolean {
    return this._display;
  }

  public set display(value: boolean) {
    this._display = value;
  }
}

export class PaintFreehand extends Paint {
  static fromJSON(json: PaintJSON): PaintFreehand {
    const freehand = new PaintFreehand();
    const points = json.points;
    points.forEach(point => freehand.addPoint(point));
    return freehand;
  }

  private _points: Point[] = [];

  constructor(public readonly lineWidth = 5) {
    super();
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
      kind: this.kind,
      display: true
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

export class PaintLine extends Paint {
  static fromJSON(json: PaintJSON): PaintLine {
    return new PaintLine();
  }

  public kind = PaintKind.Erase;
  public draw(context: CanvasRenderingContext2D) {}

  public toJSON(): PaintJSON {
    return {
      kind: this.kind,
      display: true
    };
  }
}

export class PaintImage extends Paint {
  static fromJSON(json: PaintJSON): PaintImage {
    return new PaintImage();
  }

  public kind = PaintKind.Image;
  public draw(context: CanvasRenderingContext2D) {}

  public toJSON(): PaintJSON {
    return {
      kind: this.kind,
      display: true
    };
  }
}

export class PaintErase extends Paint {
  static fromJSON(json: PaintJSON): PaintErase {
    return new PaintLine();
  }

  public kind = PaintKind.Erase;
  public draw(context: CanvasRenderingContext2D) {}

  public toJSON(): PaintJSON {
    return {
      kind: this.kind,
      display: true
    };
  }
}
