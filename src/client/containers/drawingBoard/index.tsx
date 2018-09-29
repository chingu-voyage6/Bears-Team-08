import * as React from "react";
import { findDOMNode } from "react-dom";
import * as Redux from "redux";
import { connect } from "react-redux";

import * as Styles from "./drawingBoard.css";
import { State } from "../../reducers";
import { Action, addPaint, modifyPaint } from "../../actions";
import { compose } from "../../utils";

import { Pad } from "./pad";
import { PaintKind } from "@shared/contract";
import { Paint } from "@shared/paint";
import { Drawing } from "@shared/drawing";

export type ConnectedState = {
  method: PaintKind;
  drawing: Drawing;
  token: string;
};
export type ConnectedDispatch = {
  addPaint: (paint: Paint, token: string) => void;
};

export type Props = ConnectedState & ConnectedDispatch;

class PureDrawingBoard extends React.Component<Props> {
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
    this.pad.paintMethod = this.props.method;
    return true;
  }

  public render() {
    return <canvas className={Styles.Board} />;
  }
}

const mapStateToProps = (state: State, ownProps: Props): ConnectedState => ({
  method: state.paintMethod,
  drawing: state.drawing,
  token: state.token
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action>) => ({
  addPaint: (paint: Paint, token: string) =>
    addPaint({ paint, token })(dispatch)
});

export const DrawingBoard = compose(
  PureDrawingBoard,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
