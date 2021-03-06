import * as React from "react";
import * as Styles from "./activeButton.css";

export type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  active?: boolean;
};

export class ActiveButton extends React.Component<Props> {
  public render() {
    const cssClasses = [Styles.ActiveButton];
    if (this.props.active) {
      cssClasses.push(Styles.Active);
    }
    const className = cssClasses.join(" ");
    const props = {
      ...this.props,
      className
    };
    delete props.active;
    return <button {...props} />;
  }
}
