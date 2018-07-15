import * as React from "react";
import * as Redux from "redux";
import { Provider } from "react-redux";

import { rootReducer, State } from "../client/reducers";

export const createStore = (initialState?: State): Redux.Store => {
  return Redux.createStore(rootReducer, initialState);
};

export const wrapComponentInProvider = <T extends Element>(
  children: React.ReactElement<T>,
  store: Redux.Store
): React.ReactElement<T> => {
  return <Provider store={store}>{children}</Provider>;
};
