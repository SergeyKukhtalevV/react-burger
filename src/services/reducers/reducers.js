import { combineReducers } from 'redux';

const initialState = {
  ingredientsData: [],
  dataRequest: false,
  dataFailed: false,

  ingredientsConstructor: [],

  currentIngredient: {},

  createdOrder: {}
};


export const rootReducer = combineReducers({
  // cart: cartReducer,
  // step: stepReducer
});
