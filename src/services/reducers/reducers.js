import {combineReducers} from 'redux';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/ingredients';

const initialState = {
  ingredientsData: [],
  dataRequest: false,
  dataFailed: false,

  ingredientsConstructor: [],

  currentIngredient: {},

  createdOrder: {}
};
export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        dataRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state, dataFailed: false, ingredientsData: action.items, dataRequest: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state, dataFailed: true, dataRequest: false
      };
    }
    default: {
      return state;
    }
  }
}

export const rootReducer = combineReducers({
  ingredients: ingredientReducer
  // step: stepReducer
})
