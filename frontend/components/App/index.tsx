import * as React from "react";
import * as Styles from "./app.module.css";

import { Sidebar } from "../Sidebar";
import { Navbar } from "../Navbar";
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
    this.setState({ message });
  }

  public render() {
    return (
      <div className={Styles.App}>
        <Navbar />
        <Sidebar />
        <DrawingBoard />
      </div>
    );
  }
}

export default App;
