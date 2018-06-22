import * as React from "react";
import { connect } from "react-redux";
import * as Styles from "./navbar.module.css";

class _Navbar extends React.Component<{}> {
  public render() {
    return (
      <section className={Styles.Navbar}>
        <p>test message</p>
      </section>
    );
  }
}

export const Navbar = connect()(_Navbar);
