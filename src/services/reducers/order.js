import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  DELETE_ORDER,
} from "../actions/order.js";

const initialStateOrder = {
  order: null,
};

export const orderReducer = (state = initialStateOrder, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        order: null,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.data,
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
