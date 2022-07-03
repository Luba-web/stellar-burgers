import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app";

import { Provider } from 'react-redux';
import { state } from './services/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={state}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
