import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import * as Styles from "./navbar.module.css";
import { compose } from "../../utils";
import { State } from "../../reducers";
import { Action } from "../../actions";

export type ConnectedState = {};

export type ConnectedDispatch = {};

type Props = ConnectedState & ConnectedDispatch;

class _Navbar extends React.Component<Props> {
  public render() {
    return (
      <section className={Styles.Navbar}>
        <p>test message</p>
      </section>
    );
  }
}

const mapStateToProps = (state: State, ownProps): ConnectedDispatch => ({});
const mapDispatchToProps = (
  dispatch: Redux.Dispatch<Action>
): ConnectedDispatch => ({});

export const Navbar = compose(
  _Navbar,
  connect(mapStateToProps, mapDispatchToProps)
);
