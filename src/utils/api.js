const URL = "https://norma.nomoreparties.space/api";

const checkStatus = (res) =>
  res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(`Ошибка запроса: ${err}`));

//запрос получения ингредиентов
export const getIngredientsFetch = () => {
  return fetch(`${URL}/ingredients`).then((res) => checkStatus(res));
};

//запрос оформления заказа
export const postOrderFetch = (ingredientsId) => {
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

//запрос о пользователе
export const getUserInfoFetch = () => {
  return fetch(`${URL}/auth/user`).then((res) => checkStatus(res));
};

//авторизация пользователя
export const postUserFetch = (data) => {
  return fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: data,
    }),
  }).then((res) => checkStatus(res));
};
