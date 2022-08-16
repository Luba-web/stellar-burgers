import {
  WS_CONNECTION_OPEN,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CLEAR_STORE,
} from "../actions/ws-action";

const initialState = {
  wsConnection: false,
  orders: null,
  total: null,
  totalToday: null,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_OPEN:
      return {
        ...state,
        wsConnection: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnection: false,
        error: action.payload,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnection: false,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case WS_CLEAR_STORE:
      return {
        ...state,
        orders: null,
      };
    default:
      return state;
  }
};
