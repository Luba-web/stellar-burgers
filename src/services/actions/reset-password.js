import { postResetPasswordFetch } from "../../utils/api";

/*Экшены сброса пароля*/
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

//сброс пароля
export const postResetPassword = (password, token) => {
  return (dispatch) => {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    postResetPasswordFetch(password, token)
      .then((res) => {
        if (res && res.success) {
          dispatch({ type: RESET_PASSWORD_SUCCESS });
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        dispatch({
          type: RESET_PASSWORD_FAILED,
          payload: `Произошла ошибка сброса: ${err.message}`,
        });
      });
  };
};
