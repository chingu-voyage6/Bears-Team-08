import { Paint } from "./paint";
import { uuidv4 } from "./util";

export type DrawingJSON = {
  id: string;
  name: string;
  paints: Paint[];
};

export type DrawingOptions = {
  paints?: Paint[];
  history?: any[];
};

export class Drawing {
  readonly id: string;
  private paints: Paint[];
  private history: any[];
  width: number;
  height: number;

  static fromJSON(json: DrawingJSON): Drawing {
    const paints = [];
    const history = [];
    return new Drawing(json.name, { paints, history });
  }

  constructor(public name: string, options: DrawingOptions = {}) {
    this.id = uuidv4();
    this.paints = options.paints || [];
    this.history = options.history || [];
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
