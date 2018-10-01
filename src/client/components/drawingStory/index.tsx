import * as React from "react";

import * as Styles from "./drawingStory.css";
import { Drawing } from "@shared/drawing";

export type Props = {
  drawing: Drawing;
};

export class DrawingStory extends React.Component<Props> {
  public render() {
    const drawing = this.props.drawing;
    return (
      <article className={Styles.Story}>
        <p>{drawing.id}</p>
        <p>{drawing.name}</p>
      </article>
    );
  }
}
