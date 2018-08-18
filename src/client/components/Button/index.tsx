import * as React from "react";
import * as Styles from "./button.module.css";

export type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  active?: boolean;
};

export class Button extends React.Component<Props> {
  public render() {
    const cssClasses = [Styles.Button];
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
