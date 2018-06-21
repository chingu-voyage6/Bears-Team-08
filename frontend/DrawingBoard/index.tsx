import * as React from "react";
import { findDOMNode } from "react-dom";

import * as Styles from "./drawingBoard.module.css";
import { Pad } from "./pad";

export interface Props {}
interface State {}

export class DrawingBoard extends React.Component<Props, State> {
  private pad: Pad;

  public componentDidMount() {
    // TODO: ref could possible be better way to handle this
    const canvas = findDOMNode(this) as HTMLCanvasElement;

    this.pad = new Pad(canvas);
  }

  public componentWillUnmount() {
    this.pad.removeEventListeners();
  }

  public render() {
    return <canvas className={Styles.Board} />;
  }
}

export default DrawingBoard;
