const URL = "https://norma.nomoreparties.space/api";

const checkStatus = (res) =>
  res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(`Ошибка запроса: ${err}`));

export const getIngredientsFetch = () => {
  return fetch(`${URL}/ingredients`).then((res) => checkStatus(res));
};

export const getOrderFetch = (ingredientsId) => {
  return fetch(`${URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  }).then((res) => checkStatus(res));
};
