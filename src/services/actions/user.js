import {
  postUserRegisterFetch,
  postLoginFetch,
  getUserInfoFetch,
  postTokenFetch,
  postLogoutFetch,
  changeUserFetch,
} from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/cookie";

/*Экшаны для запроса логина*/
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";

/*Экшаны для запроса регистрации*/
export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILED = "USER_REGISTER_FAILED";

/*Экшаны для информации о пользователе*/
export const USER_INFO_REQUEST = "USER_INFO_REQUEST";
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS";
export const USER_INFO_FAILED = "USER_INFO_FAILED";

/*Экшаны для обновления токена*/
export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";

/*Экшаны для выхода из личного кабинета*/
export const POST_LOGOUT_REQUEST = "POST_LOGOUT_REQUEST";
export const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
export const POST_LOGOUT_FAILED = "POST_LOGOUT_FAILED";

/*Экшены для профиля */
export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILED = "PROFILE_FAILED";

//Вход в личный кабинет
function loginSuccess(res) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: res.user,
  };
}

function loginFailed(err) {
  return {
    type: USER_LOGIN_FAILED,
    payload: `Ошибка входа пользователя: ${err.message}`,
  };
}

export function postUserLogin(email, password) {
  return function (dispatch) {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    postLoginFetch(email, password)
      .then((res) => {
        const authToken = res.accessToken.split("Bearer ")[1];
        setCookie("token", authToken);
        localStorage.setItem("token", res.refreshToken);
        if (res && res.success) {
          dispatch(loginSuccess(res));
        } else {
          dispatch(loginFailed());
        }
      })
      .catch((err) => {
        dispatch(loginFailed(err));
        console.log(`Ошибка логина${err}`);
      });
  };
}

//регистрация пользователя
function registerSuccess(res) {
  return { type: USER_REGISTER_SUCCESS, user: res.user };
}

function registerFailed(err) {
  return {
    type: USER_REGISTER_FAILED,
    payload: `Ошибка регистрации пользователя: ${err.message}`,
  };
}

export function postUserRegister(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    postUserRegisterFetch(name, email, password)
      .then((res) => {
        const authToken = res.accessToken.split("Bearer ")[1];
        setCookie("token", authToken);

        localStorage.setItem("token", res.refreshToken);
        if (res && res.success) {
          dispatch(registerSuccess(res));
        } else {
          dispatch(registerFailed());
        }
      })
      .catch((err) => {
        dispatch(registerFailed(err));
        console.log(`Ошибка в регистрации${err}`);
      });
  };
}

//запрос о пользователе
function userInfoSuccess(res) {
  return {
    type: USER_INFO_SUCCESS,
    payload: res.user,
  };
}

function userInfoFailed(err) {
  return {
    type: USER_INFO_FAILED,
    payload: `Произошла ошибка запроса: ${err.message}, попробуйте снова!`,
  };
}

export function getUserInfo() {
  return function (dispatch) {
    dispatch({
      type: USER_INFO_REQUEST,
    });
    getUserInfoFetch()
      .then((res) => {
        if (res && res.success) {
          dispatch(userInfoSuccess(res));
        } else {
          dispatch(userInfoFailed());
        }
      })
      .catch((err) => {
        dispatch(userInfoFailed(err));
        console.log(`Ошибка в запросе пользователя${err}`);
      });
  };
}

// Обновление токена
export function postToken() {
  return function (dispatch) {
    dispatch({
      type: UPDATE_TOKEN_REQUEST,
    });
    postTokenFetch()
      .then((res) => {
        const authToken = res.accessToken.split("Bearer ")[1];
        setCookie("token", authToken);
        localStorage.setItem("token", res.refreshToken);
        if (res && res.success) {
          dispatch({
            type: UPDATE_TOKEN_SUCCESS,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
          payload: `Ошибка обновления токена: ${err.message}`,
        });
        console.log(`Ошибка обновления токена ${err}`);
        throw new Error(err);
      });
  };
}

// Выход из системы профиля
function logoutSuccess(res) {
  return {
    type: POST_LOGOUT_SUCCESS,
    payload: null,
  };
}

function logoutFailed(err) {
  return {
    type: POST_LOGOUT_FAILED,
    payload: `Ошибка выхода из вашего профиля: ${err.message}`,
  };
}

export function postLogout() {
  return function (dispatch) {
    dispatch({
      type: POST_LOGOUT_REQUEST,
    });

    postLogoutFetch()
      .then((res) => {
        localStorage.removeItem("token");
        deleteCookie("token");
        if (res && res.success) {
          dispatch(logoutSuccess(res));
        } else {
          dispatch(logoutFailed());
        }
      })
      .catch((err) => {
        dispatch(logoutFailed(err));
        console.log(`Ошибка выхода из профиля пользователя${err}`);
      });
  };
}

//изменения данных пользователя
function changeUserSuccess(res) {
  return {
    type: PROFILE_SUCCESS,
    payload: "Данные успешно изменились!",
  };
}

function changeUserFailed(err) {
  return {
    type: PROFILE_FAILED,
    payload: `Произошла ошибка:  ${err.message}!`,
  };
}

export function changeUser(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: PROFILE_REQUEST,
    });

    changeUserFetch(name, email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch(changeUserSuccess(res));
        } else {
          dispatch(changeUserFailed());
        }
      })
      .catch((err) => {
        dispatch(changeUserFailed(err));
      });
  };
}
