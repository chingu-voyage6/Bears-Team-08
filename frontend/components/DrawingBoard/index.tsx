import * as React from "react";
import { findDOMNode } from "react-dom";
import * as Redux from "redux";
import { connect } from "react-redux";

import * as Styles from "./drawingBoard.module.css";
import { State } from "../../reducers";
import { Action, redo, undo } from "../../actions";
import { compose } from "../../utils";

import { Pad } from "./pad";
import { PaintKind } from "../../shared/paint";
import { Drawing } from "../../shared/drawing";

export type ConnectedState = {
  method: PaintKind;
  drawing: Drawing;
};
export type ConnectedDispatch = {};

export type Props = ConnectedState & ConnectedDispatch;

class _DrawingBoard extends React.Component<Props> {
  private pad: Pad;

  public componentDidMount() {
    // TODO: ref could possible be better way to handle this
    const canvas = findDOMNode(this) as HTMLCanvasElement;

    this.pad = Pad.newPad(canvas);
  }

  public componentWillUnmount() {
    this.pad.removeEventListeners();
  }

  public render() {
    console.debug("rendering drawing board");
    return <canvas className={Styles.Board} />;
  }
}

const mapStateToProps = (state: State, ownProps: Props): ConnectedState => ({
  method: state.method,
  drawing: state.drawing
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action>) => ({});

export const DrawingBoard = compose(
  _DrawingBoard,
  connect(mapStateToProps, mapDispatchToProps)
);
