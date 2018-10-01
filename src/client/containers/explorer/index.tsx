import * as React from "react";
import * as Redux from "redux";
import { connect } from "react-redux";

import { ID } from "@shared/contract";
import { Drawing } from "@shared/drawing";

import * as Styles from "./explorer.css";
import { DrawingStory, ScrollBox } from "../../components";
import { State } from "../../reducers";
import {
  Action,
  createDrawing,
  fetchDrawings,
  loadDrawing
} from "../../actions";
import { compose } from "../../utils";

export type ConnectedState = {
  drawings: Drawing[];
  token: string;
};

export type ConnectedDispatch = {
  createDrawing: (name: string, token: string) => void;
  fetchDrawings: (limit: number, offset: number) => void;
};

export type Props = ConnectedState & ConnectedDispatch;

type ExplorerState = {
  newDrawingNameField: string;
};

class BaseExplorer extends React.Component<Props, ExplorerState> {
  public state: ExplorerState = {
    newDrawingNameField: ""
  };

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
          items={this.props.drawings}
          fetch={this.fetchMoreDrawings}
          renderItem={this.renderDrawingStory}
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
    this.props.fetchDrawings(20, this.props.drawings.length);
  };

  private renderDrawingStory = (drawing: Drawing) => {
    console.log(drawing);
    return <DrawingStory drawing={drawing} />;
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
  fetchDrawings: (limit: number, offset: number) =>
    fetchDrawings({ limit, offset })(dispatch)
});

export const Explorer = compose(
  BaseExplorer,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
