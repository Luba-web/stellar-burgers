import { TOrders } from "../types/data";

export const WS_CONNECTION_INIT: "WS_CONNECTION_INIT" = "WS_CONNECTION_INIT";
export const WS_CONNECTION_OPEN: "WS_CONNECTION_OPEN" = "WS_CONNECTION_OPEN";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CLEAR_STORE: "WS_CLEAR_STORE" = "WS_CLEAR_STORE";

export type TWSConnectionInit = {
  readonly type: typeof WS_CONNECTION_INIT
}
export type TWSConnectionOpen = {
  readonly type: typeof WS_CONNECTION_OPEN
}
export type TWSGetMessage = {
  readonly type: typeof WS_GET_MESSAGE
  payload: { orders: TOrders[] | null, total: number, totalToday: number }
}
export type TWSConnectionClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED
}
export type TWSConnectionError = {
  readonly type: typeof WS_CONNECTION_ERROR
}
export type TWSClearStore = {
  readonly type: typeof WS_CLEAR_STORE
}

export type TWSAction = {
  readonly wsInit: typeof WS_CONNECTION_INIT,
  readonly onOpen: typeof WS_CONNECTION_OPEN,
  readonly onMessage: typeof WS_GET_MESSAGE,
  readonly onClose: typeof WS_CONNECTION_CLOSED,
  readonly onError: typeof WS_CONNECTION_ERROR
}

export type TWSActions = TWSConnectionInit
   | TWSConnectionOpen
   | TWSGetMessage
   | TWSConnectionClosed
   | TWSConnectionError
   | TWSClearStore;
