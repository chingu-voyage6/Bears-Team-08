import * as React from "react";

import * as Styles from "./scollBox.css";
import { ID } from "server/entities";

export type Props<T> = {
  items: T[];
  renderItem: (item: T) => JSX.Element;
  fetch?: () => void;
};

type State = {};

export class ScrollBox<T> extends React.Component<Props<T>, State> {
  public state: State = { count: 0, begin: 0, end: 0 };
  constructor(props: Props<T>) {
    super(props);
  }

  public async componentDidMount() {
    if (this.props.items.length === 0) {
      this.fetchMore();
    }
    const end = this.props.items.length;
    this.setState({
      count: this.props.items.length,
      begin: 0,
      end: Math.min(end, 50)
    });
  }

  public render() {
    const { items } = this.props;
    const boxes = items.map((item, i) => (
      <li
        className={Styles.ScrollBoxItem}
        key={i}
        onClick={this.handleClick(i)}
      >
        {this.props.renderItem(item)}
      </li>
    ));

    return (
      <div className={Styles.ScrollBox}>
        <ul>{boxes}</ul>
      </div>
    );
  }

  private handleClick = (n: number) => (
    ev: React.MouseEvent<HTMLLIElement>
  ) => {
    ev.preventDefault();
  };

  private fetchMore = () => {
    this.props.fetch();
  };
}
