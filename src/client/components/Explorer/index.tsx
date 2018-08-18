import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import * as Styles from "./explorer.module.css";
import { State } from "../../reducers";
import {
  Action,
  newDrawing as createDrawing,
  loadDrawing
} from "../../actions";
import { compose } from "../../utils";

export type ConnectedState = {};

export type ConnectedDispatch = {
  newDrawing: (name: string) => void;
};

export type Props = ConnectedState & ConnectedDispatch;

type ExplorerState = {
  newDrawingName: string;
};

class BaseExplorer extends React.Component<Props, ExplorerState> {
  public state: ExplorerState = {
    newDrawingName: ""
  };

  public render() {
    return (
      <div className={Styles.Explorer}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.newDrawingName}
            onChange={this.handleNewDrawingNameChange}
          />
        </label>
        <button onClick={this.handleNewDrawingClick}>New Drawing</button>
      </div>
    );
  }

  private handleNewDrawingClick = () => {
    this.props.newDrawing(this.state.newDrawingName);
  };

  private handleNewDrawingNameChange = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = ev.target;
    this.setState({ newDrawingName: value });
  };
}

const mapStateToProps = (state: State, ownProps: Props): ConnectedState => ({
  drawing: state.drawing
});

const mapDispatchToProps = (
  dispatch: Redux.Dispatch<Action>
): ConnectedDispatch => ({
  newDrawing: (name: string) => createDrawing({ name })(dispatch)
});

export const Explorer = compose(
  BaseExplorer,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
