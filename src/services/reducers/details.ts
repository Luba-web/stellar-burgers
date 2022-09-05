import { INGREDIENT_DETAILS, DETAILS_REMOVE, TDetailsActions } from "../actions/details";
import { TIngredient } from "../types/data";

type TIngredientState = {
  readonly ingredientDetail: TIngredient | string | null;
}

const initialStateDetails: TIngredientState = {
  ingredientDetail: null,
};

export const detailsReducer = (state = initialStateDetails, action: TDetailsActions): TIngredientState => {
  switch (action.type) {
    case INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetail: action.data,
      };
    }
    case DETAILS_REMOVE: {
      return {
        ...state,
        ingredientDetail: null,
      };
    }
    default:
      return state;
  }
};
