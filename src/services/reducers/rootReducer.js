import {combineReducers} from 'redux';
import {ingredientReducer} from "./ingredientReducer";
import {userReducer} from "./userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientReducer
})
