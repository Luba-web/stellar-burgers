import { postForgotPasswordFetch } from "../../utils/api";
import { AppDispatch } from "../types";

/*Экшены запроса на востановление*/
export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" = "FORGOT_PASSWORD_FAILED";

export interface IGetForgotPasswordAction {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IGetForgotPasswordFailedAction {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IGetForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
export type TForgotPasswordActions =
  | IGetForgotPasswordAction
  | IGetForgotPasswordFailedAction
  | IGetForgotPasswordSuccessAction;

export const getForgotPasswordAction = (): IGetForgotPasswordAction => ({
  type: FORGOT_PASSWORD_REQUEST
});

export const getForgotPasswordFailedAction = (): IGetForgotPasswordFailedAction => ({
  type: FORGOT_PASSWORD_FAILED
});

export const getForgotPasswordSuccessAction = (): IGetForgotPasswordSuccessAction => ({
  type: FORGOT_PASSWORD_SUCCESS,
});

//востановление пароля
export const forgotPassword = (email: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(getForgotPasswordAction);
    postForgotPasswordFetch(email)
      .then((res) => {
        if (res && res.success) {
          dispatch(getForgotPasswordSuccessAction);
        } else {
          dispatch(getForgotPasswordFailedAction);
        }
      })
      .catch((err) => {
        dispatch(getForgotPasswordSuccessAction);
        console.log(`Ошибка при запросе пароля: ${err.message}`)
      });
  };
};
