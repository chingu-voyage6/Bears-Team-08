import * as React from "react";
import * as Styles from "./app.module.css";

import { DrawingBoard } from "../DrawingBoard";

export interface Props {}

export interface State {
  lock: string; // persons name or id
}

class App extends React.Component<Props, State> {
  public render() {
    return (
      <div className={Styles.App}>
        <section className={Styles.Header} />
        <section className={Styles.Sidebar} />
        <section className={Styles.Main}>
          <DrawingBoard />
        </section>
      </div>
    );
  }
}

export default App;
