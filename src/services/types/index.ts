import {store} from '../../index'
import { Action, ActionCreator, Dispatch, } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TIngredientActions } from './action-types/ingredientsActionsTypes';

type TAllActions = TIngredientActions;

export type RootState = ReturnType<typeof store.getState>;

export type dispatch = <ReturnType = void>(action: AllActions | AppThunk) => ReturnType;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TAllActions>>;

export type AppDispatch = Dispatch<TAllActions>;
