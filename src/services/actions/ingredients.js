import {getIngredientsRequest, getOrderNumberRequest} from "../api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SET_INGREDIENT_IN_CONSTRUCTOR = 'SET_INGREDIENT_IN_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const SET_BUN_IN_CONSTRUCTOR = 'SET_BUN_IN_CONSTRUCTOR';
export const REMOVE_BUN_FROM_CONSTRUCTOR = 'REMOVE_BUN_FROM_CONSTRUCTOR';
export const DRAG_CURRENT_ELEMENT = 'DRAG_CURRENT_ELEMENT';
export const SET_DRAGGING_ELEMENT = 'SET_DRAGGING_ELEMENT';
export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const REMOVE_CURRENT_INGREDIENT = 'REMOVE_CURRENT_INGREDIENT';

export const GET_ORDER_NUMBER_REQUEST = 'GET_NUMBER_ORDER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_NUMBER_ORDER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_NUMBER_ORDER_FAILED';

export const GET_POSITION_TITLE = 'GET_POSITION_TITLE';
export const GET_CURRENT_TAB = 'GET_CURRENT_TAB';

export function setCurrentTab(activeTab) {
  return function (dispatch) {
    dispatch({
      type: GET_CURRENT_TAB,
      item: activeTab
    })
  }
}

export function addIngredient(type, id, uuid) {
  return function (dispatch) {
    if (type !== 'bun') {
      dispatch({
        type: SET_INGREDIENT_IN_CONSTRUCTOR,
        id,
        uuid
      })
    } else {
      dispatch({
        type: REMOVE_BUN_FROM_CONSTRUCTOR,
        id,
        uuid,
        ingr: type
      });
      dispatch({
        type: SET_BUN_IN_CONSTRUCTOR,
        id,
        uuid,
        ingr: type
      });
    }
  }
}
export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsRequest().then(res => {
      if (res) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          items: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    }).catch(err => {
      console.log('Ошибка, запрос на получение списка ингредиентов не выполнен', err);
    });
  };
}


export function getOrderNumber(accessToken, data) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST
    });
    getOrderNumberRequest(accessToken, data.map(ingredient => ingredient._id)).then(res => {
      if (res) {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          item: res.order.number
        });
      } else {
        dispatch({
          type: GET_ORDER_NUMBER_FAILED
        });
      }
    })
      .catch(err => {
        console.log('Ошибка, запрос на получение номера заказа не выполнен', err);
      });
  };
}
