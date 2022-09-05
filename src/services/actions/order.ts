import { postOrderFetch } from "../../utils/api";
//сброс набраных ингредиентов в конструторе
import { RESET_ELEMENT } from "./dnd";
import { AppDispatch } from "../types";

/*Экшены для ордеров */
export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const DELETE_ORDER: "DELETE_ORDER" = "DELETE_ORDER";

export interface IGetOrderAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly data: number;
}
export interface IGetOrderDeleteAction {
  readonly type: typeof DELETE_ORDER;
}

export type TOrdersActions =
  | IGetOrderAction
  | IGetOrderFailedAction
  | IGetOrderSuccessAction 
  | IGetOrderDeleteAction;


const getOrderRequest = (): IGetOrderAction => {
  return {
    type: GET_ORDER_REQUEST,
  };
};
// тут any
const getOrderSuccess = (res: any): IGetOrderSuccessAction => {
  return {
    type: GET_ORDER_SUCCESS,
    data: res.order.number,
  };
};

const getOrderFailed = ():IGetOrderFailedAction => {
  return {
    type: GET_ORDER_FAILED,
  };
};

export function getOrder(id: string[]) {
  return function (dispatch: AppDispatch) {
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