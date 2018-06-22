export class Point {
  public static fromMouseEvent(e: MouseEvent): Point {
    return new Point({ x: e.offsetX, y: e.offsetY });
  }

  constructor(private coords: { x: number; y: number }) {}

  get x(): number {
    return this.coords.x;
  }
  get y(): number {
    return this.coords.y;
  }
}
