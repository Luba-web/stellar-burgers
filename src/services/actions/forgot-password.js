import { postForgotPasswordFetch } from "../../utils/api";

/*Экшены запроса на востановление*/
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

//востановление пароля
export const forgotPassword = (email) => {
  return (dispatch) => {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    postForgotPasswordFetch(email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
          });
        } else {
          dispatch({
            type: FORGOT_PASSWORD_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
          payload: `Ошибка при запросе пароля: ${err.message}`,
        });
      });
  };
};
