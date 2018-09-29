import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import * as Styles from "./sidebar.css";

import { ActiveButton } from "../../components";
import { State } from "../../reducers";
import { Action, redo, undo, changePaintMethod } from "../../actions";
import { compose } from "../../utils";
import { PaintKind } from "@shared/contract";

type ConnectedState = {
  method: PaintKind;
  token: string;
};

type ConnectedDispatch = {
  changeMethod: (method: PaintKind) => void;
  undo: (token: string) => void;
  redo: (token: string) => void;
};

export type Props = ConnectedState & ConnectedDispatch;

type MethodButtonProps = {
  method: PaintKind;
  kind: PaintKind;
  handleClick: (method: PaintKind) => () => void;
};

class PureSideBar extends React.Component<Props> {
  public render() {
    const { method } = this.props;
    return (
      <section className={Styles.Sidebar}>
        <ActiveButton onClick={this.handleUndoClick}>undo</ActiveButton>
        <ActiveButton onClick={this.handleRedoClick}>redo</ActiveButton>
        {this.renderMethodButton(PaintKind.Freehand, "Freehand")}
        {this.renderMethodButton(PaintKind.Line, "Line")}
        {this.renderMethodButton(PaintKind.Image, "Image")}
        {this.renderMethodButton(PaintKind.Erase, "Erase")}
      </section>
    );
  }

  private handleMethodClick = (method: PaintKind) => () => {
    this.props.changeMethod(method);
  };

  private handleUndoClick = () => {
    this.props.undo(this.props.token);
  };

  private handleRedoClick = () => {
    this.props.undo(this.props.token);
  };

  private renderMethodButton = (
    kind: PaintKind,
    text: string
  ): React.ReactElement<ActiveButton> => {
    const active = this.props.method === kind;
    return (
      <ActiveButton active={active} onClick={this.handleMethodClick(kind)}>
        {text}
      </ActiveButton>
    );
  };
}

const mapStateToProps = (state: State, ownProps: Props): ConnectedState => ({
  method: state.paintMethod,
  token: state.token
});

const mapDispatchToProps = (
  dispatch: Redux.Dispatch<Action>
): ConnectedDispatch => ({
  changeMethod: (method: PaintKind) => dispatch(changePaintMethod(method)),
  undo: (token: string) => undo({ token })(dispatch),
  redo: (token: string) => redo({ token })(dispatch)
});

export const Sidebar = compose(
  PureSideBar,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
