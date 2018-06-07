import * as React from "react";
import { findDOMNode } from "react-dom";

import * as Styles from "./drawingBoard.module.css";

export interface Props {}

export class DrawingBoard extends React.Component<Props> {
  private canvas;

  public componentDidMount() {
    this.canvas = findDOMNode(this) as HTMLCanvasElement;
  }

  public render() {
    return <canvas className={Styles.Board} />;
  }
}

export default DrawingBoard;
