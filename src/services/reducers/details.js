import { INGREDIENT_DETAILS, DETAILS_REMOVE } from "../actions/details.js";

const initialStateDetails = {
  ingredientDetail: {},
};

export const detailsReducer = (state = initialStateDetails, action) => {
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
        ingredientDetail: {},
      };
    }
    default:
      return state
  }
};
