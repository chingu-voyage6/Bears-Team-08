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

  public readonly kind: PaintKind;
  private disp: boolean = true;
  public abstract draw(ctx: CanvasRenderingContext2D);
  public abstract toJSON(): PaintJSON;

  public get display(): boolean {
    return this.disp;
  }

  public set display(value: boolean) {
    this.disp = value;
  }
}

export class PaintFreehand extends Paint {
  public static fromJSON(json: PaintJSON): PaintFreehand {
    const freehand = new PaintFreehand();
    const points = json.points;
    points.forEach(point => freehand.addPoint(point));
    return freehand;
  }

  private rawPoints: Point[] = [];

  constructor(public readonly lineWidth = 5) {
    super();
    // new Path2D()
  }

  public get kind() {
    return PaintKind.Freehand;
  }

  public addPoint(point: Point) {
    this.rawPoints.push(point);
  }

  public popPoint(): Point {
    return this.rawPoints.pop();
  }

  public toJSON(): PaintJSON {
    return {
      kind: this.kind,
      display: true
    };
  }

  public get points() {
    return this.rawPoints.map(point => point);
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
  public static fromJSON(json: PaintJSON): PaintLine {
    return new PaintLine();
  }

  public kind = PaintKind.Erase;
  public draw(context: CanvasRenderingContext2D) {
    return null;
  }

  public toJSON(): PaintJSON {
    return {
      kind: this.kind,
      display: true
    };
  }
}

export class PaintImage extends Paint {
  public static fromJSON(json: PaintJSON): PaintImage {
    return new PaintImage();
  }

  public kind = PaintKind.Image;
  public draw(context: CanvasRenderingContext2D) {
    return null;
  }

  public toJSON(): PaintJSON {
    return {
      kind: this.kind,
      display: true
    };
  }
}

export class PaintErase extends Paint {
  public static fromJSON(json: PaintJSON): PaintErase {
    return new PaintLine();
  }

  public kind = PaintKind.Erase;

  public draw(context: CanvasRenderingContext2D) {
    return null;
  }

  public toJSON(): PaintJSON {
    return {
      kind: this.kind,
      display: true
    };
  }
}
