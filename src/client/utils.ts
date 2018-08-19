import * as React from "react";

type ReactComponent = React.SFC | React.ComponentClass;

type HOC = (C: ReactComponent) => ReactComponent;

export const compose = (Component: ReactComponent, ...hocs: HOC[]) =>
  hocs.reduce((C, hoc) => hoc(C), Component);
