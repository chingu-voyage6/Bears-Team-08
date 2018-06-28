import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import * as Styles from "./sidebar.module.css";
import { Button } from "../Button";
import { State } from "../../reducers";
import { Action, redo, undo, changePaintMethod } from "../../actions";
import { PaintKind } from "../../shared/paint";
import { compose } from "../../utils";

type ConnectedState = {
  method: PaintKind;
};

type ConnectedDispatch = {
  changeMethod: (method: PaintKind) => void;
  undo: () => void;
  redo: () => void;
};

export type Props = ConnectedState & ConnectedDispatch;

class _SideBar extends React.Component<Props> {
  public render() {
    const { method } = this.props;
    return (
      <section className={Styles.Sidebar}>
        <Button onClick={this.props.undo}>undo</Button>
        <Button onClick={this.props.redo}>redo</Button>
        <Button
          active={method === PaintKind.Freehand}
          onClick={this.handleMethodClick(PaintKind.Freehand)}
        >
          freehand
        </Button>
        <Button
          active={method === PaintKind.Line}
          onClick={this.handleMethodClick(PaintKind.Line)}
        >
          line
        </Button>
        <Button
          active={method === PaintKind.Image}
          onClick={this.handleMethodClick(PaintKind.Image)}
        >
          Image
        </Button>
        <Button
          active={method === PaintKind.Erase}
          onClick={this.handleMethodClick(PaintKind.Erase)}
        >
          Erase
        </Button>
      </section>
    );
  }

  public handleMethodClick = (method: PaintKind) => () => {
    this.props.changeMethod(method);
  };
}

const mapStateToProps = (state: State, ownProps: Props): ConnectedState => ({
  method: state.method
});

const mapDispatchToProps = (
  dispatch: Redux.Dispatch<Action>
): ConnectedDispatch => ({
  changeMethod: (method: PaintKind) => dispatch(changePaintMethod(method)),
  undo: () => undo(dispatch),
  redo: () => redo(dispatch)
});

export const Sidebar = compose(
  _SideBar,
  connect(mapStateToProps, mapDispatchToProps)
);
