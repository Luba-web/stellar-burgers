import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  DELETE_ORDER,
} from "../actions/order.js";

const initialStateOrder = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initialStateOrder, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.data,
        orderRequest: false,
        orderFailed: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    case DELETE_ORDER: {
      return {
        ...state,
        order: null,
      };
    }
    default:
      return state;
  }
};
