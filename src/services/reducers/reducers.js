import {combineReducers} from 'redux';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_CONSTRUCTOR,
  SET_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT, GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS, GET_ORDER_NUMBER_FAILED
} from '../actions/ingredients';

const initialState = {
  ingredientsData: [],
  dataRequest: false,
  dataFailed: false,

  ingredientsConstructor: [],

  currentIngredient: {},

  createdOrder: {},

  orderNumber: null,
  orderNumberRequest: false,
  orderNumberFailed: false

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
    case GET_INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: [...state.ingredientsData].filter(item => item.type !== 'bun')
        }
    }
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: [...state.ingredientsData].filter(item => item._id === action.id)[0]
      }
    }
    case REMOVE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: {}
      }
    }
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumberRequest: true
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state, orderNumberFailed: false, orderNumber: action.item, orderNumberRequest: false
      };
    }
    case GET_ORDER_NUMBER_FAILED: {
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
})
