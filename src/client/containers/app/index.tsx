import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import { Drawing } from "@shared/drawing";

import * as Styles from "./app.css";
import { DrawingBoard, Explorer, Navbar, Sidebar } from "../";
import { Action } from "../../actions";
import { State } from "../../reducers";
import { compose } from "../../utils";

export type ConnectedState = {
  isDrawing: boolean;
  error: string;
};

export type ConnectedDispatch = {};

export type Props = ConnectedState & ConnectedDispatch;

class BaseApp extends React.Component<Props> {
  public componentDidUpdate() {
    if (this.props.isDrawing) {
      /* const id = this.props.drawing.id; */
    }
  }

  public render() {
    if (this.props.error) {
      alert(this.props.error);
    }
    const { isDrawing } = this.props;
    return (
      <div
        className={`${Styles.App} ${
          isDrawing ? Styles.Drawing : Styles.Exploring
        }`}
      >
        <Navbar />
        {isDrawing ? (
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
  isDrawing: state.isDrawing,
  error: state.error
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Action>) => ({});

export const App = compose(
  BaseApp,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
export default App; // Jest requires this for some reason
