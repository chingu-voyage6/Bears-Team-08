import { Paint } from "./paint";

export type DrawingJSON = {};

export class Drawing {
  paints: Paint[];
  width: number;
  height: number;

  static fromJSON(json: DrawingJSON): Drawing {
    const paints = [];
    return new Drawing(paints);
  }

  constructor(paints?: Paint[]) {
    this.paints = paints || [];
    this.width = 500;
    this.height = 500;
  }

  public addPaint(paint: Paint) {
    this.paints.push(paint);
  }

  public updatePaint(
    index: number,
    updatePaintFn: (paint: Paint) => Paint
  ): boolean {
    const paint = this.paints[index];
    if (paint) {
      updatePaintFn(paint);
    }
    return paint !== undefined;
  }
}
