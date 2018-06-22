import { Point } from "./point";
import {
  PaintLine,
  PaintObject,
  PaintObjectKind,
  PaintErase,
  PaintImage
} from "./paintObject";

enum State {
  Init,
  Editing,
  NotEditing
}

interface PadProps {
  canvas: HTMLCanvasElement;
  state: State;
  seq: number;
  history: PaintObject[];
}

export class Pad {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private method: PaintObjectKind;
  private state: State;
  private history: PaintObject[];
  private seq: number;

  public static fromHistory(canvas: HTMLCanvasElement, history: PaintObject[]) {
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
    this.context = props.canvas.getContext("2d");
    this.method = PaintObjectKind.Line;
    this.history = props.history;
    this.seq = props.seq;

    this.onResize();
    this.canvas.addEventListener("onresize", this.onResize, false);

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

  public get paintMethod(): PaintObjectKind {
    return this.method;
  }

  public set paintMethod(method: PaintObjectKind) {
    this.method = method;
  }

  public removeEventListeners() {
    this.canvas.removeEventListener("onresize", this.onResize, false);

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
      case State.Init: {
        this.state = State.Editing;
        const paintObject = this.newPaintObject();
        this.history[this.seq] = paintObject;
        this.seq += 1;
        break;
      }
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
      case State.Init: {
        break;
      }
      case State.NotEditing: {
        break;
      }
      case State.Editing: {
        const paintObject = this.history[this.seq - 1];
        switch (paintObject.kind) {
          case PaintObjectKind.Line: {
            const line = paintObject as PaintLine;
            const point = Point.fromMouseEvent(e);
            line.pushPoint(point);
          }
          case PaintObjectKind.Image: {
          }
          case PaintObjectKind.Erase: {
          }
        }
        this.redraw();
        break;
      }
    }
  };

  private release = (e: MouseEvent) => {
    const paintObject = this.history[this.seq];
    switch (this.state) {
      case State.Init: {
        const line = paintObject as PaintLine;
        const point = Point.fromMouseEvent(e);
        line.pushPoint(point);
        break;
      }
      case State.NotEditing: {
        const line = paintObject as PaintLine;
        const point = Point.fromMouseEvent(e);
        line.pushPoint(point);
        break;
      }
      case State.Editing: {
        this.state = State.NotEditing;
        break;
      }
    }
  };

  private cancel = (e: MouseEvent) => {};

  private redraw() {
    this.clear();
    for (let i = 0; i < this.seq; i += 1) {
      this.history[i].draw(this.context);
    }
  }

  private onResize = () => {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.clear();
    this.redraw();
  };

  private newPaintObject(): PaintObject {
    switch (this.method) {
      case PaintObjectKind.Line: {
        return new PaintLine();
      }
      case PaintObjectKind.Image: {
        return new PaintImage();
      }
      case PaintObjectKind.Erase: {
        return new PaintErase();
      }
    }
  }
}
