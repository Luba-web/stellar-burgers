import { store } from '../store';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { TDetailsActions } from "../actions/details";
import { TConstructorActions } from "../actions/dnd";
import { TForgotPasswordActions } from "../actions/forgot-password";
import { TIngredientsActions } from "../actions/ingredients";
import { TOrdersActions } from "../actions/order";
import { TResetActions } from "../actions/reset-password";
import { TUserActions } from "../actions/user";
import { TWSActions } from "../actions/ws-action";

type TApplicationActions = TDetailsActions | TConstructorActions | TForgotPasswordActions | TIngredientsActions | TOrdersActions | TResetActions | TUserActions | TWSActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;