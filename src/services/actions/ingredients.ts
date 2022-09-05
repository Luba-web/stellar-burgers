import { getIngredientsFetch } from "../../utils/api";
import { TIngredient } from "../types/data";
import { AppDispatch } from "../types";

/*Экшены для ингредиентов */
export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<TIngredient>;
}

export type TIngredientsActions =
  | IGetIngredientsAction
  | IGetIngredientsFailedAction
  | IGetIngredientsSuccessAction;

const getIngredientsRequest = (): IGetIngredientsAction => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
};

// тут any Array<TIngredient>
const getIngredientsSuccess = (data: Array<TIngredient>): IGetIngredientsSuccessAction => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: data,
  };
};

const getIngredientsFailed = (): IGetIngredientsFailedAction => {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
};

export const getIngredients = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequest());
    return getIngredientsFetch()
      .then((res) => {
        dispatch(getIngredientsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getIngredientsFailed());
        console.log(`Ошибка ${err}`);
      });
  };
};
