import {combineReducers} from 'redux';
import {ingredientReducer} from "./ingredientReducer";
import {userReducer} from "./userReducer";
import {feedReducer} from "./feedReducer";

export const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  feed: feedReducer,
  user: userReducer
})
