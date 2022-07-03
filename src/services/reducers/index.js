import { combineReducers } from "redux";
import { orderReducer } from "./order"
import { dndReducer } from "./dnd"
import { ingredientsReducer } from "./burger-ingredients";
import { detailsReducer } from "./details";

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  order: orderReducer,
  details: detailsReducer,
  dnd: dndReducer
})