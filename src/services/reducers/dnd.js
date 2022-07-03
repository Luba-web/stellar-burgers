import update from "immutability-helper"

import {
  ADD_BUN,
  ADD_INGREDIENTSCONSTRUCTOR,
  DELETE_ITEM,
  RESET_ITEMS,
  MOVE_CONSTRUCTOR_ITEM
} from "../actions/dnd.js"

const initialStateDnd = {
  bun: [],
  ingredientsConstructor: []
}

export const dndReducer = (state = initialStateDnd, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.data
      }

    }
    case ADD_INGREDIENTSCONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: [...state.ingredientsConstructor, action.data],
      }
    }
    case DELETE_ITEM: {
      return {
        ...state,
        ingredientsConstructor: [...state.ingredientsConstructor].filter(item => {
          return item.id !== action.id
        })
      }
    }
    case MOVE_CONSTRUCTOR_ITEM: {
      const dragConstructor = state.ingredientsConstructor[action.data.dragIndex]
      const ingredientsConstructor = update(state.ingredientsConstructor, {
        $splice: [
          [action.data.dragIndex, 1],
          [action.data.hoverIndex, 0, dragConstructor],
        ],
      })
      return {
        ...state,
        ingredientsConstructor
      }
    }
    case RESET_ITEMS: {
      return {
        ...state,
        ingredientsConstructor: [],
        bun: []
      }
    }
    default:
      return state
  }
}
