import * as React from "react";
import * as ReactDOM from "react-dom";
import { Store, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import "./styles.css";

import { App } from "./containers";
import { rootReducer, State, initialState } from "./reducers";
import { register } from "./registerServiceWorker";
/* import { token } from "./middlewares"; */

const store: Store<State> = createStore(
  rootReducer,
  initialState,
  applyMiddleware()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);

register();
