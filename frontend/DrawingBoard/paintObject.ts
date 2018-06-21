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
  public kind = PaintObjectKind.Line;
  private points: Point[] = [];
  constructor() {}

  public pushPoint(point: Point) {
    this.points.push(point);
  }
  public popPoint(): Point {
    return this.points.pop();
  }

  public draw(context: CanvasRenderingContext2D) {
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
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
