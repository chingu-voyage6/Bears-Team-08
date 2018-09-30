import * as React from "react";

import * as Styles from "./scollBox.css";

export type Props = {
  thingy: any[];
  fetch?: () => void;
};

type ItemProps = {
  key: number;
  item: any;
};

class ScrollBoxItem extends React.Component<ItemProps> {
  public render() {
    return <li key={this.props.key}>{this.props.item}</li>;
  }
}

export class ScrollBox extends React.Component<Props> {
  public render() {
    return (
      <div>
        <ul>
          {this.props.thingy.map((c, i) => (
            <ScrollBoxItem key={i} item={c} />
          ))}
        </ul>
      </div>
    );
  }
}
