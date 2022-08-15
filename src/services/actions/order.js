import { postOrderFetch } from "../../utils/api";
//сброс набраных ингредиентов в конструторе
import { RESET_ELEMENT } from "../actions/dnd.js";

/*Экшены для ордеров */
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const DELETE_ORDER = "DELETE_ORDER";

export function getOrder(id) {
  return function (dispatch) {
    dispatch(getOrderRequest());
    postOrderFetch(id)
      .then((res) => {
        dispatch(getOrderSuccess(res));
      })
      .then((res) => {
        dispatch({
          type: RESET_ELEMENT,
        });
      })
      .catch((err) => {
        dispatch(getOrderFailed());
        console.log(`Ошибка ${err}`);
      });
  };
}

const getOrderRequest = () => {
  return {
    type: GET_ORDER_REQUEST,
  };
};

const getOrderSuccess = (res) => {
  return {
    type: GET_ORDER_SUCCESS,
    data: res.order.number,
  };
};

const getOrderFailed = () => {
  return {
    type: GET_ORDER_FAILED,
  };
};
