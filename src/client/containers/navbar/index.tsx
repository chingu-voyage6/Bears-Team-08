import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import { Drawing } from "@shared/drawing";

import * as Styles from "./navbar.css";
import { Action } from "../../actions";
import { Avatar, Logo } from "../../components";
import { State } from "../../reducers";
import { compose } from "../../utils";
import { navToExplorer } from "../../actions/base";

export type ConnectedState = {
  isDrawing: boolean;
  drawing?: Drawing;
};

export type ConnectedDispatch = {
  navToExplorer: () => void;
};
export type Props = ConnectedState & ConnectedDispatch;
class PureNavbar extends React.Component<Props> {
  public render() {
    const { drawing } = this.props;

    return (
      <section className={Styles.Navbar}>
        <header>
          <nav className={Styles.Nav}>
            <a onClick={this.handleClick}>
              <Logo />
            </a>
            {this.renderDrawingName(drawing)}
            <Avatar />
          </nav>
        </header>
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

  private handleClick = () => {
    this.props.navToExplorer();
  };
}

const mapStateToProps = (state: State, ownProps: Props): ConnectedState => ({
  isDrawing: state.isDrawing,
  drawing: state.drawing
});
const mapDispatchToProps = (
  dispatch: Redux.Dispatch<Action>
): ConnectedDispatch => ({
  navToExplorer: () => dispatch(navToExplorer())
});

export const Navbar = compose(
  PureNavbar,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
