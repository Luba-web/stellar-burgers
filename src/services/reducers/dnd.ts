import {
  ADD_BUN,
  ADD_INGREDIENTS_CONSTRUCTOR,
  DELETE_ELEMENT,
  RESET_ELEMENT,
  MOVE_CONSTRUCTOR_ELEMENT,
  TConstructorActions,
} from "../actions/dnd";
import { TIngredient } from "../types/data";

type TConstructorState = { 
  readonly bun: TIngredient | null;
  readonly ingredientsConstructor: Array<TIngredient>;
}

const initialStateDnd: TConstructorState = {
  bun: null,
  ingredientsConstructor: [],
};

export const dndReducer = (state = initialStateDnd, action: TConstructorActions): TConstructorState => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.payload
      };
    }
    case ADD_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: [...state.ingredientsConstructor, action.payload],
      };
    }
    case DELETE_ELEMENT: {
      return {
        ...state,
        ingredientsConstructor: [...state.ingredientsConstructor].filter(
          (item) => {
            return item.id !== action.id;
          }
        ),
      };
    }
    case MOVE_CONSTRUCTOR_ELEMENT: {
      const dragConstructor = [...state.ingredientsConstructor];
      dragConstructor.splice(
        action.data.dragIndex,
        0,
        dragConstructor.splice(action.data.hoverIndex, 1)[0]
      );

      return {
        ...state,
        ingredientsConstructor: dragConstructor,
      };
    }
    //использую для сброса ингредиентов в конструторе в order
    case RESET_ELEMENT: {
      return {
        ...state,
        ingredientsConstructor: [],
        bun: null,
      };
    }
    default:
      return state;
  }
};
