import * as React from "react";
import * as Styles from "./app.module.css";

import { DrawingBoard } from "../DrawingBoard";

export interface Props {}

export interface State {
  lock: string; // persons name or id
  message?: string;
}

class App extends React.Component<Props, State> {
  public state: State = {
    lock: "nope"
  };

  public async componentWillMount() {
    const res = await fetch("/api");
    const json = await res.json();
    const message = json["message"];
    console.log("message is", message);
    this.setState({ message });
  }

  public render() {
    return (
      <div className={Styles.App}>
        <section className={Styles.Header}>
          <p>{this.state.message || "Api not hit"}</p>
        </section>
        <section className={Styles.Sidebar} />
        <section className={Styles.Main}>
          <DrawingBoard />
        </section>
      </div>
    );
  }
}

export default App;
