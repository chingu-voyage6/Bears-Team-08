import { Point } from "./point";

export enum PaintObjectKind {
  Freehand = "FREEHAND",
  Line = "LINE",
  Image = "IMAGE",
  Erase = "ERASE"
}

export interface PaintObject {
  readonly kind: PaintObjectKind;
  toJSON: () => Object;
}

export class Freehand implements PaintObject {
  private _points: Point[] = [];
  static fromJSON(json: { kind: PaintObjectKind; points: Point[] }): Freehand {
    const freehand = new Freehand();
    const points = json.points;
    points.forEach(point => freehand.addPoint(point));
    return freehand;
  }
  constructor(public readonly lineWidth = 5) {
    // new Path2D()
  }

  public get kind() {
    return PaintObjectKind.Freehand;
  }

  public addPoint(point: Point) {
    this._points.push(point);
  }

  public popPoint(): Point {
    return this._points.pop();
  }

  public toJSON(): Object {
    return {
      kind: this.kind
    };
  }

  public get points() {
    return this._points.map(point => point);
  }
}

export class Line implements PaintObject {
  public kind = PaintObjectKind.Erase;
  public draw(context: CanvasRenderingContext2D) {}

  public toJSON(): Object {
    return {
      kind: this.kind
    };
  }
}

export class Image implements PaintObject {
  public kind = PaintObjectKind.Image;
  public draw(context: CanvasRenderingContext2D) {}

  public toJSON(): Object {
    return {
      kind: this.kind
    };
  }
}

export class Erase implements PaintObject {
  public kind = PaintObjectKind.Erase;
  public draw(context: CanvasRenderingContext2D) {}

  public toJSON(): Object {
    return {
      kind: this.kind
    };
  }
}
