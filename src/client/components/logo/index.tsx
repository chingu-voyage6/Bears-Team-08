import * as React from "react";

import { UserJSON } from "@shared/contract";

import * as Styles from "./logo.css";
import * as Placeholder from "./placeholder.jpg";

export type Props = {
  className?: string;
};

export class Logo extends React.Component<Props> {
  public render() {
    const className = this.props.className
      ? Styles.Logo
      : [Styles.Logo].concat(this.props.className).join(" ");
    return <img className={className} src={Placeholder} />;
  }
}
