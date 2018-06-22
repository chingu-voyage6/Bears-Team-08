import { Point } from "./point";

export enum PaintObjectKind {
  Line,
  Image,
  Erase
}

export interface PaintObject {
  readonly kind: PaintObjectKind;
  draw(ctx: CanvasRenderingContext2D): void;
}

export class PaintLine implements PaintObject {
  private points: Point[] = [];
  constructor(public readonly lineWidth = 5) {
    // new Path2D()
  }

  public get kind() {
    return PaintObjectKind.Line;
  }

  public addPoint(point: Point) {
    this.points.push(point);
  }
  public popPoint(): Point {
    return this.points.pop();
  }

  public draw(context: CanvasRenderingContext2D) {
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = this.lineWidth;

    context.beginPath();
    this.points.map((point, i) => {
      context.beginPath();
      const { offsetLeft, offsetTop } = context.canvas;
      if (i === 0) {
        context.moveTo(point.x, point.y);
      } else {
        const lastPoint = this.points[i - 1];
        context.moveTo(lastPoint.x, lastPoint.y);
      }
      context.lineTo(point.x, point.y);
      context.stroke();
    });
  }
}

export class PaintImage implements PaintObject {
  public kind = PaintObjectKind.Image;
  public draw(context: CanvasRenderingContext2D) {}
}

export class PaintErase implements PaintObject {
  public kind = PaintObjectKind.Image;
  public draw(context: CanvasRenderingContext2D) {}
}
