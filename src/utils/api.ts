import { getCookie } from "./cookie";
import { TIngredientsRes, TUserRes, TGetUser, TOrderRes, TDefaultRes, TRefreshTokenRes } from "../services/types/data";

const URL = "https://norma.nomoreparties.space/api";

const checkStatus = <T>(res: Response): Promise<T> =>
  res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(`Ошибка запроса: ${err}`));


//запрос получения ингредиентов
export const getIngredientsFetch = () => {
  return fetch(`${URL}/ingredients`).then((res) => checkStatus<TIngredientsRes>(res));
};

//запрос оформления заказа
export const postOrderFetch = (ingredientsId: Array<string>) => {
  return fetch(`${URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  }).then((res) => checkStatus<TOrderRes>(res));
};

//forgot-password
export const postForgotPasswordFetch = (email: string) => {
  return fetch(`${URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then((res) => checkStatus<TDefaultRes>(res));
};

//reset-password
export const postResetPasswordFetch = (password: string, token: string) => {
  return fetch(`${URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, token: token }),
  }).then((res) => checkStatus<TDefaultRes>(res));
};

//авторизация пользователя /login
export const postLoginFetch = (email: string, password: string) => {
  return fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => checkStatus<TUserRes>(res));
};

//регистрация пользователя /register
export const postUserRegisterFetch = (name: string, email: string, password: string) => {
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
  }).then((res) => checkStatus<TUserRes>(res));
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
  }).then((res) => checkStatus<TDefaultRes>(res));
};

//запрос информации о пользователе
export const getUserInfoFetch = () => {
  return fetch(`${URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  }).then((res) => checkStatus<TGetUser>(res));
};

//запрос обновления для пользователя
export const changeUserFetch = (name: string, email: string, password: string) => {
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
  }).then((res) => checkStatus<TGetUser>(res));
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
  }).then((res) => checkStatus<TRefreshTokenRes>(res));
};
