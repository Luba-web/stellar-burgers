import { getIngredientsFetch } from "../../utils/api";

/*Экшены для ингредиентов */
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngredients = () => {
  return (dispatch) => {
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

const getIngredientsRequest = () => {
  return {
    type: GET_INGREDIENTS_REQUEST,
  };
};

const getIngredientsSuccess = (data) => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: data,
  };
};

const getIngredientsFailed = () => {
  return {
    type: GET_INGREDIENTS_FAILED,
  };
};
