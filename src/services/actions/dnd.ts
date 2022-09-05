import { TIngredient } from "../types/data";

/*Экшены для переноса dnd */
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const ADD_INGREDIENTS_CONSTRUCTOR: "ADD_INGREDIENTS_CONSTRUCTOR" = "ADD_INGREDIENTS_CONSTRUCTOR";
export const DELETE_ELEMENT: "DELETE_ELEMENT" = "DELETE_ELEMENT";
export const RESET_ELEMENT: "RESET_ELEMENT" = "RESET_ELEMENT";
export const MOVE_CONSTRUCTOR_ELEMENT: "MOVE_CONSTRUCTOR_ELEMENT" = "MOVE_CONSTRUCTOR_ELEMENT";

export type TAddBun = {
  readonly type: typeof ADD_BUN
  payload: TIngredient
}
export type TAddIngredientsConstructor = {
  readonly type: typeof ADD_INGREDIENTS_CONSTRUCTOR
  payload: TIngredient
}
export type TDeleteIElement = {
  readonly type: typeof DELETE_ELEMENT
  id: number
}
export type TResetElement = {
  readonly type: typeof RESET_ELEMENT
}
export type TMoveConstructorElement = {
  readonly type: typeof MOVE_CONSTRUCTOR_ELEMENT
  data: { dragIndex: number, hoverIndex: number }
}

export type TConstructorActions = TAddBun
  | TAddIngredientsConstructor
  | TDeleteIElement
  | TResetElement
  | TMoveConstructorElement
