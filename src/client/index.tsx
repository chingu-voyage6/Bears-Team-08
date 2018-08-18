import * as React from "react";
import * as ReactDOM from "react-dom";
import { Store, createStore } from "redux";
import { Provider } from "react-redux";

import "./styles.css";

import { App } from "./components/App";
import { rootReducer, State } from "./reducers";
import { register } from "./registerServiceWorker";

const store: Store<State> = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);

register();
