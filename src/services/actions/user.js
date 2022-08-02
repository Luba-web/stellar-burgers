import {
  postUserRegisterFetch,
  postLoginFetch,
  getUserInfoFetch,
  postTokenFetch,
  postLogoutFetch,
  patchUserFetch,
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
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.user,
          });
        } else {
          dispatch({
            type: USER_LOGIN_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: USER_LOGIN_FAILED,
          payload: `Ошибка входа пользователя: ${err.message}`,
        });
      });
  };
}

//регистрация
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
          dispatch({ type: USER_REGISTER_SUCCESS, user: res.user });
        } else {
          dispatch({
            type: USER_REGISTER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: USER_REGISTER_FAILED,
          payload: `Ошибка регистрации пользователя: ${err.message}`,
        });
        console.log(`Ошибка ${err}`);
      });
  };
}

//запрос о пользователе
export const getUserInfo = () => {
  return (dispatch) => {
    dispatch({
      type: USER_INFO_REQUEST,
    });
    getUserInfoFetch()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_INFO_SUCCESS,
            payload: res.user,
          });
        } else {
          dispatch({
            type: USER_INFO_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: USER_INFO_FAILED,
          payload: `Произошла ошибка: ${err.message}, попробуйте снова!`,
        });
      });
  };
};

// Обновление токена
export const postToken = () => {
  console.log("action post");
  return (dispatch) => {
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
        } else {
        }
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_TOKEN_FAILED,
          payload: `Ошибка обновления токена: ${err.message}`,
        });

        throw new Error(err);
      });
  };
};

// Выход из системы
export const postLogout = () => {
  return (dispatch) => {
    dispatch({
      type: POST_LOGOUT_REQUEST,
    });

    postLogoutFetch()
      .then((res) => {
        localStorage.removeItem("token");
        deleteCookie("token");
        if (res && res.success) {
          dispatch({
            type: POST_LOGOUT_SUCCESS,
            payload: null,
          });
        } else {
          dispatch({
            type: POST_LOGOUT_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_LOGOUT_FAILED,
          payload: `Ошибка выхода из вашего профиля: ${err.message}`,
        });
      });
  };
};

//изменения данных пользователя
export const patchUser = (name, email, password) => {
  return (dispatch) => {
    dispatch({
      type: PROFILE_REQUEST,
    });

    patchUserFetch(name, email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: PROFILE_SUCCESS,
            payload: "Данные успешно изменились!",
          });
        } else {
          dispatch({
            type: PROFILE_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: PROFILE_FAILED,
          payload: `Произошла ошибка:  ${err.message}!`,
        });
      });
  };
};
