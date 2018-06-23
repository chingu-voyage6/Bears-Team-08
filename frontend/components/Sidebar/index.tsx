import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import * as Styles from "./sidebar.module.css";
import { State } from "../../reducers";
import { Action } from "../../actions";
import { redo, undo, changePaintMethod } from "../../actions";
import { PaintObjectKind } from "../../shared/paintObject";
import { compose } from "../../utils";

export type ConnectedState = {};

export type ConnectedDispatch = {
  changeMethod: (method: PaintObjectKind) => void;
};

type Props = ConnectedState & ConnectedDispatch;

class _SideBar extends React.Component<Props> {
  public render() {
    return (
      <section className={Styles.Sidebar}>
        <button>redo</button>
        <button>undo</button>
        <button onClick={this.handleMethodChange(PaintObjectKind.Freehand)}>
          freehand
        </button>
        <button onClick={this.handleMethodChange(PaintObjectKind.Line)}>
          line
        </button>
        <button onClick={this.handleMethodChange(PaintObjectKind.Image)}>
          Image
        </button>
        <button onClick={this.handleMethodChange(PaintObjectKind.Erase)}>
          Erase
        </button>
      </section>
    );
  }

  public handleMethodChange = (method: PaintObjectKind) => () => {
    this.props.changeMethod(method);
  };
}

const mapStateToProps = (state: State, ownProps: Props): ConnectedState => ({});

const mapDispatchToProps = (
  dispatch: Redux.Dispatch<Action>
): ConnectedDispatch => ({
  changeMethod: (method: PaintObjectKind) => dispatch(changePaintMethod(method))
});

export const Sidebar = compose(
  _SideBar,
  connect(mapStateToProps, mapDispatchToProps)
);
