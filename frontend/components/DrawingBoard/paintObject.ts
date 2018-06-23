import { Point } from "../../shared/point";
import * as Paint from "../../shared/paintObject";
import { PaintObjectKind } from "../../shared/paintObject";

export { PaintObjectKind } from "../../shared/paintObject";

export type Drawable = {
  draw: (ctx: CanvasRenderingContext2D) => void;
};

export type PaintObject = Paint.PaintObject & Drawable;

export class Freehand extends Paint.Freehand implements Drawable {
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

export class Line extends Paint.Line implements Drawable {
  public draw(context: CanvasRenderingContext2D) {}
}

export class Erase extends Paint.Erase implements Drawable {
  public draw(context: CanvasRenderingContext2D) {}
}

export class Image extends Paint.Image implements Drawable {
  public draw(context: CanvasRenderingContext2D) {}
}
