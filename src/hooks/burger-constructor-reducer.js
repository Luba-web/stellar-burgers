// функция-редьюсер
// изменяет состояния в зависимости от типа переданного action
const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return action.bun
        ? {
          ...state,
          bun: action.ingredient,
        }
        : {
          ...state,
          ingredients: [...state.ingredients, action.ingredient],
        };
    case "addIngredients":
      return {
        ...state,
        ingredients: [...action.addIngredients],
      };
    case "delete":
      return {
        ...state,
        ingredients: [
          ...state.ingredients.filter((e) => e.uuid !== action.uuid),
        ],
      };
    case "reset":
      return {
        ...state,
        ingredients: [],
        bun: "",
        reset: true,
      };
    default:
      return state;
  }
};

export default reducer;
