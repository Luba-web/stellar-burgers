import { getCookie } from "./cookie";

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
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  }).then((res) => checkStatus(res));
};

//forgot-password
export const postForgotPasswordFetch = (email) => {
  return fetch(`${URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then((res) => checkStatus(res));
};

//reset-password
export const postResetPasswordFetch = (password, token) => {
  return fetch(`${URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, token: token }),
  }).then((res) => checkStatus(res));
};

//авторизация пользователя /login
export const postLoginFetch = (email, password) => {
  return fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => checkStatus(res));
};

//регистрация пользователя /register
export const postUserRegisterFetch = (name, email, password) => {
  return fetch(`${URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then((res) => checkStatus(res));
};

//выход пользователя /logout
export const postLogoutFetch = () => {
  return fetch(`${URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  }).then((res) => checkStatus(res));
};

//запрос информации о пользователе
export const getUserInfoFetch = () => {
  return fetch(`${URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  }).then((res) => checkStatus(res));
};

//запрос обновления для пользователя
export const changeUserFetch = (name, email, password) => {
  return fetch(`${URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then((res) => checkStatus(res));
};

//обновление токена /token
export const postTokenFetch = () => {
  return fetch(`${URL}/auth/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
    }),
  }).then((res) => checkStatus(res));
};
