import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/app/app";

import { Provider } from "react-redux";
import { store } from "./services/store";

import { createRoot } from "react-dom/client";


const container = document.getElementById("root")!;//as HTMLElement или !
const root = createRoot(container);

root.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>
);
