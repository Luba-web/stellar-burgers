import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  TResetActions,
} from "../actions/reset-password";

type TResetState = { 
  readonly resetPasswordRequest: boolean,
  readonly resetPasswordFailed: boolean,
  readonly resetPasswordSuccess: boolean,
}

const initialResetPassword: TResetState = {
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: false,
};

export const resetPasswordReducer = (state = initialResetPassword, action: TResetActions): TResetState => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordSuccess: true,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      };
    }
    default:
      return state;
  }
};
