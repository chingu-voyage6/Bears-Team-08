import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import * as Styles from "./app.module.css";
import { Sidebar } from "../Sidebar";
import { Navbar } from "../Navbar";
import { DrawingBoard } from "../DrawingBoard";
import { Action } from "../../actions";
import { State } from "../../reducers";
import { Drawing } from "../../shared/drawing";
import { compose } from "../../utils";
import { Explorer } from "../Explorer";

export type ConnectedState = {
  drawing: Drawing;
};

export type ConnectedDispatch = {};

export type Props = ConnectedState & ConnectedDispatch;

class _App extends React.Component<Props> {
  public async componentWillMount() {
    try {
      const res = await fetch("/api");
      const json = await res
        .json()
        .catch(error => Promise.reject({ msg: "rawr", error }));
      const message = json["message"];
      this.setState({ message });
    } catch (error) {
      console.error("error caught", error);
    }
  }

  componentDidUpdate() {
    if (this.props.drawing) {
      const id = this.props.drawing.id;
    }
  }

  public render() {
    const { drawing } = this.props;
    return (
      <div
        className={`${Styles.App} ${
          drawing ? Styles.Drawing : Styles.Exploring
        }`}
      >
        <Navbar />
        {drawing ? (
          <>
            <Sidebar />
            <DrawingBoard />
          </>
        ) : (
          <Explorer />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: Props): ConnectedState => ({
  drawing: state.drawing
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action>) => ({});

export const App = compose(_App, connect(mapStateToProps, mapDispatchToProps));
export default App; // Jest requires this for some reason
