import {store} from '../../index'
import { Action, ActionCreator, Dispatch, } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TIngredientActions } from './action-types/ingredientsActionsTypes';
import {TUserActions} from "./action-types/userActionsTypes";
import {TWsFeedActions, TWsUserFeedActions} from "../action-types";

type TAllActions = TIngredientActions | TUserActions | TWsFeedActions | TWsUserFeedActions;

export type RootState = ReturnType<typeof store.getState>;

export type dispatch = <ReturnType = void>(action: TAllActions | AppThunk) => ReturnType;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TAllActions>>;

export type AppDispatch = Dispatch<TAllActions>;
