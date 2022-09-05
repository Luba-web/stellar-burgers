import { postResetPasswordFetch } from "../../utils/api";
import { AppDispatch } from "../types";

/*Экшены сброса пароля*/
export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";

export interface IGetResetAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IGetResetFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IGetResetSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export type TResetActions =
  | IGetResetAction
  | IGetResetFailedAction
  | IGetResetSuccessAction;

export const getResetAction = (): IGetResetAction => ({
  type: RESET_PASSWORD_REQUEST
});

export const getResetFailedAction = (): IGetResetFailedAction => ({
  type: RESET_PASSWORD_FAILED
});

export const getResetSuccessAction = (): IGetResetSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS,
});

//сброс пароля
export const postResetPassword = (password: string, token: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(getResetAction);
    postResetPasswordFetch(password, token)
      .then((res) => {
        if (res && res.success) {
          dispatch(getResetSuccessAction);
        } else {
          dispatch(getResetFailedAction);
        }
      })
      .catch((err) => {
        console.log(`Ошибка Reset ${err}`);
        dispatch(getResetFailedAction);
      });
  };
};
