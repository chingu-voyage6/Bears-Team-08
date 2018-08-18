import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import * as Styles from "./navbar.module.css";
import { compose } from "../../utils";
import { State } from "../../reducers";
import { Action } from "../../actions";
import { Drawing } from "@shared/drawing";

export type ConnectedState = {
  isDrawing: boolean;
  drawing: Drawing;
};

export type ConnectedDispatch = {};

export type Props = ConnectedState & ConnectedDispatch;

class PureNavbar extends React.Component<Props> {
  public render() {
    const { drawing } = this.props;

    return (
      <section className={Styles.Navbar}>
        {this.renderDrawingName(drawing)}
      </section>
    );
  }

  private renderDrawingName = drawing => {
    if (drawing && drawing.name) {
      return (
        <>
          <p>Drawing: {drawing.name}</p>
        </>
      );
    } else {
      return <></>;
    }
  };
}

const mapStateToProps = (state: State, ownProps: Props): ConnectedDispatch => ({
  isDrawing: state.isDrawing,
  drawing: state.drawing
});
const mapDispatchToProps = (
  dispatch: Redux.Dispatch<Action>
): ConnectedDispatch => ({});

export const Navbar = compose(
  PureNavbar,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
