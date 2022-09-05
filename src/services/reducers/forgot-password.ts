import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  TForgotPasswordActions,
} from "../actions/forgot-password";

type TInitialForgotPasswordPassword = {
 readonly forgotPasswordRequest: boolean;
 readonly forgotPasswordFailed: boolean;
 readonly forgotPasswordSuccess: boolean;
};

const initialResetPassword: TInitialForgotPasswordPassword = {
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordSuccess: false,
};

export const forgotPasswordReducer = (state = initialResetPassword, action: TForgotPasswordActions): TInitialForgotPasswordPassword => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordFailed: false,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: true,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
      };
    }
    default:
      return state;
  }
};
