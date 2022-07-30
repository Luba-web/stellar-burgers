import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_FAILED,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILED,
} from "../actions/user";

const initialStateUser = {
  user: {},

  userInfoRequest: false,
  userInfoFailed: false,

  loginRequest: false,
  loginFailed: false,

  registerRequest: false,
  registerFailed: false,

  tokenRequest: false,
  tokenSuccess: false,
  tokenFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  profileRequest: false,
  profileFailed: false,
};

export const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    //запрос логина
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loginRequest: false,
        loginFailed: false,
      };
    }
    case USER_LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }

    // регистрация
    case USER_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        registerRequest: false,
        registerFailed: false,
      };
    }
    case USER_REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
      };
    }
    //запрос о пользователе
    case USER_INFO_REQUEST: {
      return {
        ...state,
        userInfoRequest: true,
      };
    }
    case USER_INFO_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        userInfoRequest: false,
        userInfoFailed: false,
      };
    }
    case USER_INFO_FAILED: {
      return {
        ...state,
        userInfoRequest: false,
        userInfoFailed: true,
      };
    }
    //обновление
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        tokenRequest: true,
      };
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        tokenRequest: false,
        tokenSuccess: true,
        tokenFailed: false,
      };
    }
    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        tokenRequest: false,
        tokenFailed: true,
      };
    }
    //выход из личного кабинета
    case POST_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case POST_LOGOUT_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        logoutRequest: false,
        logoutFailed: false,
      };
    }
    case POST_LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
      };
    }
    //изменения профайла
    case PROFILE_REQUEST: {
      return {
        ...state,
        profileRequest: true,
      };
    }
    case PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        profileRequest: false,
        profileFailed: false,
      };
    }
    case PROFILE_FAILED: {
      return {
        ...state,
        profileRequest: false,
        profileFailed: true,
      };
    }
    default:
      return state;
  }
};
