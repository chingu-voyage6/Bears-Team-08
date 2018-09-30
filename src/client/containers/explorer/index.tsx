import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import { Drawing } from "@shared/drawing";

import * as Styles from "./explorer.css";
import { ScrollBox } from "../../components";
import { State } from "../../reducers";
import { Action, createDrawing, loadDrawing, getDrawings } from "../../actions";
import { compose } from "../../utils";

export type ConnectedState = {
  drawings: Drawing[];
  token: string;
};

export type ConnectedDispatch = {
  createDrawing: (name: string, token: string) => void;
  getDrawings: (limit: number, offset: number) => void;
};

export type Props = ConnectedState & ConnectedDispatch;

type ExplorerState = {
  newDrawingNameField: string;
};

class BaseExplorer extends React.Component<Props, ExplorerState> {
  public state: ExplorerState = {
    newDrawingNameField: ""
  };
  public componentDidMount() {
    this.fetchMoreDrawings();
  }

  public render() {
    return (
      <section className={Styles.Explorer}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.newDrawingNameField}
            onChange={this.handleNewDrawingNameChange}
          />
        </label>
        <button onClick={this.handleNewDrawingClick}>New Drawing</button>
        <ScrollBox
          thingy={this.props.drawings}
          fetch={this.fetchMoreDrawings}
        />
      </section>
    );
  }

  private handleNewDrawingClick = () => {
    this.props.createDrawing(this.state.newDrawingNameField, this.props.token);
  };

  private handleNewDrawingNameChange = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = ev.target;
    this.setState({ newDrawingNameField: value });
  };

  private fetchMoreDrawings = (): void => {
    this.props.getDrawings(10, this.props.drawings.length);
  };
}

const mapStateToProps = (state: State, ownProps: Props): ConnectedState => ({
  drawings: state.drawings,
  token: state.token
});

const mapDispatchToProps = (
  dispatch: Redux.Dispatch<Action>
): ConnectedDispatch => ({
  createDrawing: (name: string, token: string) =>
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
