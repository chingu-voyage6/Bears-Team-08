import * as React from "react";
import { findDOMNode } from "react-dom";

import * as Styles from "./drawingBoard.module.css";
import { connect } from "react-redux";

import { Pad } from "./pad";

export interface Props {}
interface State {}

class _DrawingBoard extends React.Component<Props, State> {
  private pad: Pad;

  public componentDidMount() {
    // TODO: ref could possible be better way to handle this
    const canvas = findDOMNode(this) as HTMLCanvasElement;

    this.pad = Pad.newPad(canvas);
  }

  public componentWillUnmount() {
    this.pad.removeEventListeners();
  }

  public componentDidUpdate() {
    /* this.pad.paintMethod(this.props.method) */
    return false;
  }

  public render() {
    console.debug("rendering drawing board");
    return <canvas className={Styles.Board} />;
  }
}

export const DrawingBoard = connect()(_DrawingBoard);
