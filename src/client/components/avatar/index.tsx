import * as React from "react";

import { UserJSON } from "@shared/contract";

import * as Styles from "./avatar.css";
import * as Placeholder from "./placeholder.png";

export type Props = {
  user?: UserJSON;
  className?: string;
};

// example avatar "https://avatars0.githubusercontent.com/u/10249856?s=460&v=4"
export class Avatar extends React.Component<Props> {
  public render() {
    const className = this.props.className
      ? Styles.Logo
      : [Styles.Logo].concat(this.props.className).join(" ");

    const props = this.props;
    const image = props.user ? <img src={Placeholder} /> : <></>;
    return <div className={className}>{image}</div>;
  }
}
