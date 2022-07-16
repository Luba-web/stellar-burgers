import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/app/app";

import { Provider } from "react-redux";
import { state } from "./services/store";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={state}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);
