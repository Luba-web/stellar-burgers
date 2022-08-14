import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./reducers/index";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socket-middleware";
import { wsUrl, wsActions } from "../utils/ws";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware(wsUrl, wsActions))
);

export const store = createStore(rootReducer, enhancer);
