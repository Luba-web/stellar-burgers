import { combineReducers } from "redux";
import { orderReducer } from "./order";
import { dndReducer } from "./dnd";
import { ingredientsReducer } from "./ingredients";
import { detailsReducer } from "./details";
import { resetPasswordReducer } from "./reset-password";
import { forgotPasswordReducer } from "./forgot-password";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  order: orderReducer,
  details: detailsReducer,
  dnd: dndReducer,
  resetPassword: resetPasswordReducer,
  forgotPassword: forgotPasswordReducer,
  user: userReducer,
});
