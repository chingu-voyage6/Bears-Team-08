import { Point } from "../../shared/point";

import {
  ErasePaint,
  FreehandPaint,
  ImagePaint,
  LinePaint,
  Paint,
  PaintKind
} from "../../shared/paint";

enum State {
  Init,
  Editing,
  NotEditing
}

interface PadProps {
  canvas: HTMLCanvasElement;
  state: State;
  seq: number;
  history: Array<Paint>;
}

export class Pad {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private method: PaintKind;
  private state: State;
  private history: Paint[];
  private seq: number;

  public static fromHistory(canvas: HTMLCanvasElement, history: Paint[]) {
    return new Pad({
      canvas,
      state: State.NotEditing,
      history: history,
      seq: history.length
    });
  }

  public static newPad(canvas: HTMLCanvasElement): Pad {
    return new Pad({
      canvas,
      state: State.Init,
      history: [],
      seq: 0
    });
  }

  private constructor(props: PadProps) {
    this.canvas = props.canvas;
    this.state = props.state;
    this.context = props.canvas.getContext("2d", { alpha: false });
    this.method = PaintKind.Freehand;
    this.history = props.history;
    this.seq = props.seq;

    this.onResize();
    window.addEventListener("resize", this.onResize, false);

    this.canvas.addEventListener("mousedown", this.press, false);
    this.canvas.addEventListener("mousemove", this.drag, false);
    this.canvas.addEventListener("mouseup", this.release, false);
    this.canvas.addEventListener("mouseout", this.cancel, false);

    // Add touch event listeners to canvas element
    this.canvas.addEventListener("touchstart", this.press, {
      passive: false // TODO: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
    });
    this.canvas.addEventListener("touchmove", this.drag, {
      passive: false // TODO: same as above
    });
    this.canvas.addEventListener("touchend", this.release, false);
    this.canvas.addEventListener("touchcancel", this.cancel, false);
  }

  public get paintMethod(): PaintKind {
    return this.method;
  }

  public set paintMethod(method: PaintKind) {
    this.method = method;
  }

  public removeEventListeners() {
    this.canvas.removeEventListener("resize", this.onResize, false);

    // remove event listeners from canvas element
    this.canvas.removeEventListener("mousedown", this.press, false);
    this.canvas.removeEventListener("mousemove", this.drag, false);
    this.canvas.removeEventListener("mouseup", this.release);
    this.canvas.removeEventListener("mouseout", this.cancel, false);

    // remove touch event listeners from canvas element
    this.canvas.removeEventListener("touchstart", this.press, false);
    this.canvas.removeEventListener("touchmove", this.drag, false);
    this.canvas.removeEventListener("touchend", this.release, false);
    this.canvas.removeEventListener("touchcancel", this.cancel, false);
  }

  public undo() {
    if (this.seq > 0) {
      this.seq -= 1;
      this.redraw();
    }
  }

  public clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private press = (e: MouseEvent) => {
    switch (this.state) {
      case State.Init:
      case State.NotEditing: {
        this.state = State.Editing;
        const paintObject = this.newPaintObject();
        this.history[this.seq] = paintObject;
        this.seq += 1;
        break;
      }
      case State.Editing: {
        break;
      }
    }
  };

  private drag = (e: MouseEvent) => {
    e.preventDefault();
    switch (this.state) {
      case State.Init:
      case State.NotEditing: {
        break;
      }
      case State.Editing: {
        this.addPaint(e);
      }
    }
  };

  private release = (e: MouseEvent) => {
    switch (this.state) {
      case State.Init:
      case State.NotEditing: {
      }
      case State.Editing: {
        this.addPaint(e);
        this.state = State.NotEditing;
        break;
      }
    }
  };

  private cancel = (e: MouseEvent) => {
    switch (this.state) {
      case State.Init:
      case State.NotEditing:
        break;
      case State.Editing: {
        this.release(e);
        break;
      }
    }
  };

  private redraw() {
    this.clear();
    // this.context.save();
    for (let i = 0; i < this.seq; i += 1) {
      this.history[i].draw(this.context);
    }
    // this.context.restore();
  }

  private onResize = () => {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.clear();
    this.redraw();
  };

  private addPaint = (e: MouseEvent) => {
    const paint = this.history[this.seq - 1];
    switch (paint.kind) {
      case PaintKind.Freehand: {
        const freehand = paint as FreehandPaint;
        const point = Point.fromMouseEvent(e);
        freehand.addPoint(point);
        break;
      }
      case PaintKind.Line:
      case PaintKind.Image:
      case PaintKind.Erase: {
        break;
      }
    }
    this.redraw();
  };

  private newPaintObject(): Paint {
    switch (this.method) {
      case PaintKind.Freehand: {
        return new FreehandPaint();
      }
      case PaintKind.Line: {
        return new LinePaint();
      }
      case PaintKind.Image: {
        return new ImagePaint();
      }
      case PaintKind.Erase: {
        return new ErasePaint();
      }
    }
  }
}
