import {getIngredientsRequest} from "../api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_INGREDIENTS_CONSTRUCTOR = 'GET_INGREDIENTS_CONSTRUCTOR';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const REMOVE_CURRENT_INGREDIENT = 'REMOVE_CURRENT_INGREDIENT';

export const GET_NUMBER_ORDER_REQUEST = 'GET_NUMBER_ORDER_REQUEST';
export const GET_NUMBER_ORDER_SUCCESS = 'GET_NUMBER_ORDER_SUCCESS';
export const GET_NUMBER_ORDER_FAILED = 'GET_NUMBER_ORDER_FAILED';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsRequest().then(res => {
      if(res) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    });
  };
}