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

export class Pad {
  private context: CanvasRenderingContext2D;
  private method: PaintObjectKind = PaintObjectKind.Line;
  private state: State = State.Init;
  private history: PaintObject[] = [];
  private seq: number = 0;

  constructor(public readonly canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d");
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
    console.debug("undo");
  }

  public load(history: PaintObject[]) {
    this.state = State.NotEditing;
    this.history = history; // TODO: should this be a deep copy?
    this.seq = history.length;
  }

  public clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private press = (e: MouseEvent) => {
    switch (this.state) {
      case State.Init | State.NotEditing: {
        this.state = State.Editing;
        const paintObject = this.newPaintObject();
        this.seq += 1;
      }
      case State.Editing: {
      }
    }
    console.debug("pressed");
  };

  private drag = (e: MouseEvent) => {
    e.preventDefault();
    switch (this.state) {
      case State.Init | State.NotEditing: {
      }
      case State.Editing: {
        const paintObject = this.history[this.seq];
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
      }
    }
    this.redraw();
    console.debug("drag");
  };

  private release = (e: MouseEvent) => {
    switch (this.state) {
      case State.Init | State.NotEditing: {
      }
      case State.Editing: {
        this.state = State.NotEditing;
      }
    }
  };

  private cancel = (e: MouseEvent) => {
    console.debug("cancel");
  };

  private redraw() {
    this.clear();
    for (let i = 0; i < this.seq; i += 1) {
      this.history[i].draw(this.context);
    }
  }

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
