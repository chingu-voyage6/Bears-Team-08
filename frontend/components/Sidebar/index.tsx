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

type MethodButtonProps = {
  method: PaintKind;
  kind: PaintKind;
  handleClick: (method: PaintKind) => () => void;
};

class _SideBar extends React.Component<Props> {
  private renderMethodButton = (
    kind: PaintKind,
    text: string
  ): React.ReactElement<Button> => {
    const active = this.props.method === kind;
    return (
      <Button active={active} onClick={this.handleMethodClick(kind)}>
        {text}
      </Button>
    );
  };

  public render() {
    const { method } = this.props;
    return (
      <section className={Styles.Sidebar}>
        <Button onClick={this.props.undo}>undo</Button>
        <Button onClick={this.props.redo}>redo</Button>
        {this.renderMethodButton(PaintKind.Freehand, "Freehand")}
        {this.renderMethodButton(PaintKind.Line, "Line")}
        {this.renderMethodButton(PaintKind.Image, "Image")}
        {this.renderMethodButton(PaintKind.Erase, "Erase")}
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
