import { TIngredient } from "../types/data";

/*Экшены для деталей ингредиентов */
export const INGREDIENT_DETAILS: "INGREDIENT_DETAILS" = "INGREDIENT_DETAILS";
export const DETAILS_REMOVE: "DETAILS_REMOVE" = "DETAILS_REMOVE";


export type TDetails = {
  readonly type: typeof INGREDIENT_DETAILS
  data: TIngredient 
}
export type TDetailsRemove = {
  readonly type: typeof DETAILS_REMOVE
  data: TIngredient 
}


export type TDetailsActions = TDetails
  | TDetailsRemove;
