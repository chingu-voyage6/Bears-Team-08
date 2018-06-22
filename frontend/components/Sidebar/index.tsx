import * as React from "react";
import { connect } from "react-redux";
import * as Styles from "./sidebar.module.css";

class _SideBar extends React.Component<{}> {
  public render() {
    return (
      <section className={Styles.Sidebar}>
        <button>redo</button>
        <button>undo</button>
        <button>freestyle</button>
        <button>line</button>
      </section>
    );
  }
}

export const Sidebar = connect()(_SideBar);
