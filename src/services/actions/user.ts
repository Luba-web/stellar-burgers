import {
  postUserRegisterFetch,
  postLoginFetch,
  getUserInfoFetch,
  postTokenFetch,
  postLogoutFetch,
  changeUserFetch,
} from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/cookie";
import { AppDispatch } from "../types";
import { TUser } from "../types/data";


/*Экшаны для запроса логина*/
export const USER_LOGIN_REQUEST: "USER_LOGIN_REQUEST" = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS" = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILED: "USER_LOGIN_FAILED" = "USER_LOGIN_FAILED";

/*Экшаны для запроса регистрации*/
export const USER_REGISTER_REQUEST: "USER_REGISTER_REQUEST" = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS: "USER_REGISTER_SUCCESS" = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILED: "USER_REGISTER_FAILED" = "USER_REGISTER_FAILED";

/*Экшаны для информации о пользователе*/
export const USER_INFO_REQUEST: "USER_INFO_REQUEST" = "USER_INFO_REQUEST";
export const USER_INFO_SUCCESS: "USER_INFO_SUCCESS" = "USER_INFO_SUCCESS";
export const USER_INFO_FAILED: "USER_INFO_FAILED" = "USER_INFO_FAILED";

/*Экшаны для обновления токена*/
export const UPDATE_TOKEN_REQUEST: "UPDATE_TOKEN_REQUEST" = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS" = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED: "UPDATE_TOKEN_FAILED" = "UPDATE_TOKEN_FAILED";

/*Экшаны для выхода из личного кабинета*/
export const POST_LOGOUT_REQUEST: "POST_LOGOUT_REQUEST" = "POST_LOGOUT_REQUEST";
export const POST_LOGOUT_SUCCESS: "POST_LOGOUT_SUCCESS" = "POST_LOGOUT_SUCCESS";
export const POST_LOGOUT_FAILED: "POST_LOGOUT_FAILED" = "POST_LOGOUT_FAILED";

/*Экшены для профиля */
export const PROFILE_REQUEST: "PROFILE_REQUEST" = "PROFILE_REQUEST";
export const PROFILE_SUCCESS: "PROFILE_SUCCESS" = "PROFILE_SUCCESS";
export const PROFILE_FAILED: "PROFILE_FAILED" = "PROFILE_FAILED";

//Вход в личный кабинет
export interface IGetLoginAction {
  readonly type: typeof USER_LOGIN_REQUEST;
}

export interface IGetLoginFailedAction {
  readonly type: typeof USER_LOGIN_FAILED;
}

export interface IGetLoginSuccessAction {
  readonly type: typeof USER_LOGIN_SUCCESS;
  readonly payload: TUser;
}

// export type TLoginActions =
//   | IGetLoginAction
//   | IGetLoginFailedAction
//   | IGetLoginSuccessAction;

function loginRequest(): IGetLoginAction {
    return {
      type: USER_LOGIN_REQUEST,
    };
  }

//тут any
function loginSuccess(res: any): IGetLoginSuccessAction {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: res.user,
  };
}

function loginFailed(): IGetLoginFailedAction {
  return {
    type: USER_LOGIN_FAILED,
  };
}

export function postUserLogin(email: string, password: string) {
  return function (dispatch: AppDispatch) {
    dispatch(loginRequest());
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
        dispatch(loginFailed());
        console.log(`Ошибка логина${err}`);
      });
  };
}

//регистрация пользователя
export interface IGetRegisterAction {
  readonly type: typeof USER_REGISTER_REQUEST;
}

export interface IGetRegisterFailedAction {
  readonly type: typeof USER_REGISTER_FAILED;
}

export interface IGetRegisterSuccessAction {
  readonly type: typeof USER_REGISTER_SUCCESS;
  readonly payload: TUser;
}

// export type TRegisterActions =
//   | IGetRegisterAction
//   | IGetRegisterFailedAction
//   | IGetRegisterSuccessAction;

function registerRequest(): IGetRegisterAction {
    return { type: USER_REGISTER_REQUEST };
  }

//тут any
function registerSuccess(res: any): IGetRegisterSuccessAction {
  return { type: USER_REGISTER_SUCCESS, payload: res.user };
}

function registerFailed(): IGetRegisterFailedAction {
  return {
    type: USER_REGISTER_FAILED,
  };
}

export function postUserRegister(name: string, email: string, password: string) {
  return function (dispatch: AppDispatch) {
    dispatch(registerRequest());
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
        dispatch(registerFailed());
        console.log(`Ошибка в регистрации${err}`);
      });
  };
}

//запрос о пользователе
export interface IGetUserInfoAction {
  readonly type: typeof USER_INFO_REQUEST;
}

export interface IGetUserInfoFailedAction {
  readonly type: typeof USER_INFO_FAILED;
}

export interface IGetUserInfoSuccessAction {
  readonly type: typeof USER_INFO_SUCCESS;
  readonly payload: TUser;
}

// export type TUserInfoActions =
//   | IGetUserInfoAction
//   | IGetUserInfoFailedAction
//   | IGetUserInfoSuccessAction;

  function userInfoRequest(): IGetUserInfoAction {
    return {
      type: USER_INFO_REQUEST,
    };
  }
  //тут any
function userInfoSuccess(res: any): IGetUserInfoSuccessAction {
  return {
    type: USER_INFO_SUCCESS,
    payload: res.user,
  };
}

function userInfoFailed(): IGetUserInfoFailedAction {
  return {
    type: USER_INFO_FAILED,
  };
}

export function getUserInfo() {
  return function (dispatch: AppDispatch) {
    dispatch(userInfoRequest());
    getUserInfoFetch()
      .then((res) => {
        if (res && res.success) {
          dispatch(userInfoSuccess(res));
        } else {
          dispatch(userInfoFailed());
        }
      })
      .catch((err) => {
        dispatch(userInfoFailed());
        console.log(`Ошибка в запросе пользователя${err}`);
      });
  };
}

// Обновление токена
export interface IGetUpdateTokenAction {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}
export interface IGetUpdateTokenFailedAction {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}
export interface IGetUpdateTokenSuccessAction {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
}

// export type TUpdateTokenActions =
//   | IGetUpdateTokenAction
//   | IGetUpdateTokenFailedAction
//   | IGetUpdateTokenSuccessAction;

function updateTokenRequest(): IGetUpdateTokenAction {
    return {
      type: UPDATE_TOKEN_REQUEST,
    };
  }
function updateTokenSuccess(): IGetUpdateTokenSuccessAction {
  return {
    type: UPDATE_TOKEN_SUCCESS,
  };
}
function updateTokenFailed(): IGetUpdateTokenFailedAction {
  return {
    type: UPDATE_TOKEN_FAILED,
  };
}

export function postToken() {
  return function (dispatch: AppDispatch) {
    dispatch(updateTokenRequest());
    postTokenFetch()
      .then((res) => {
        const authToken = res.accessToken.split("Bearer ")[1];
        setCookie("token", authToken);
        localStorage.setItem("token", res.refreshToken);
        if (res && res.success) {
          dispatch(updateTokenSuccess());
        }
      })
      .catch((err) => {
        dispatch(updateTokenFailed());
        console.log(`Ошибка обновления токена ${err}`);
        throw new Error(err);
      });
  };
}

// Выход из системы профиля
export interface IGetLogoutAction {
  readonly type: typeof POST_LOGOUT_REQUEST;
}
export interface IGetLogoutFailedAction {
  readonly type: typeof POST_LOGOUT_FAILED;
}
export interface IGetLogoutSuccessAction {
  readonly type: typeof POST_LOGOUT_SUCCESS;
  readonly payload: null;
}

// export type TLogoutActions =
//   | IGetLogoutAction
//   | IGetLogoutFailedAction
//   | IGetLogoutSuccessAction;

function logoutRequest(): IGetLogoutAction {
    return {
      type: POST_LOGOUT_REQUEST,
    };
  }
//тут any
function logoutSuccess(res: any): IGetLogoutSuccessAction {
  return {
    type: POST_LOGOUT_SUCCESS,
    payload: null,
  };
}
function logoutFailed(): IGetLogoutFailedAction {
  return {
    type: POST_LOGOUT_FAILED,
  };
}

export function postLogout() {
  return function (dispatch: AppDispatch) {
    dispatch(logoutRequest());
    postLogoutFetch()
      .then((res) => {
        localStorage.removeItem("token");
        deleteCookie("token");
        if (res && res.success) {
          dispatch(logoutSuccess(res));
        }
      })
      .catch((err) => {
        dispatch(logoutFailed());
        console.log(`Ошибка выхода из профиля пользователя${err}`);
      });
  };
}

//изменения данных пользователя
export interface IGetChangeUserAction {
  readonly type: typeof PROFILE_REQUEST;
}
export interface IGetChangeUserFailedAction {
  readonly type: typeof PROFILE_FAILED;
}
export interface IGetChangeUserSuccessAction {
  readonly type: typeof PROFILE_SUCCESS;
}

// export type TChangeUserActions =
//   | IGetChangeUserAction
//   | IGetChangeUserFailedAction
//   | IGetChangeUserSuccessAction;

function changeUserRequest(): IGetChangeUserAction {
  return {
    type: PROFILE_REQUEST,
  };
}

function changeUserSuccess(): IGetChangeUserSuccessAction {
  return {
    type: PROFILE_SUCCESS,
  };
}

function changeUserFailed(): IGetChangeUserFailedAction {
  return {
    type: PROFILE_FAILED,
  };
}

export function changeUser(name: string, email: string, password: string) {
  return function (dispatch: AppDispatch) {
    dispatch(changeUserRequest());
    changeUserFetch(name, email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch(changeUserSuccess());
        }
      })
      .catch((err) => {
        dispatch(changeUserFailed());
        console.log(`Ошибка изменения профиля пользователя${err}`);
      });
  };
}
 export type TUserActions = 
 | IGetLoginAction
 | IGetLoginFailedAction
 | IGetLoginSuccessAction
 | IGetRegisterAction
 | IGetRegisterFailedAction
 | IGetRegisterSuccessAction
 | IGetUserInfoAction
 | IGetUserInfoFailedAction
 | IGetUserInfoSuccessAction
 | IGetUpdateTokenAction
 | IGetUpdateTokenFailedAction
 | IGetUpdateTokenSuccessAction
 | IGetLogoutAction
 | IGetLogoutFailedAction
 | IGetLogoutSuccessAction
 | IGetChangeUserAction
 | IGetChangeUserFailedAction
 | IGetChangeUserSuccessAction;
