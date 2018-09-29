import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import * as Styles from "./explorer.css";
import { State } from "../../reducers";
import { Action, createDrawing, loadDrawing, getDrawings } from "../../actions";
import { compose } from "../../utils";
import { Drawing } from "@shared/drawing";

export type ConnectedState = {
  drawings: Drawing[];
  token: string;
};

export type ConnectedDispatch = {
  newDrawing: (name: string, token: string) => void;
  getDrawings: (limit: number, offset: number) => void;
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
    this.props.newDrawing(this.state.newDrawingName, this.props.token);
  };

  private handleNewDrawingNameChange = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = ev.target;
    this.setState({ newDrawingName: value });
  };
}

const mapStateToProps = (state: State, ownProps: Props): ConnectedState => ({
  drawings: state.drawings,
  token: state.token
});

const mapDispatchToProps = (
  dispatch: Redux.Dispatch<Action>
): ConnectedDispatch => ({
  newDrawing: (name: string, token: string) =>
    createDrawing({ name, token })(dispatch),
  getDrawings: (limit: number, offset: number) =>
    getDrawings({ limit, offset })(dispatch)
});

export const Explorer = compose(
  BaseExplorer,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
