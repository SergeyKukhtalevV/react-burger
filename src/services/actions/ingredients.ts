import {getIngredientsRequest, getOrderNumberRequest} from "../api";
import {AppThunk, AppDispatch} from '../types';
import {
  IGetIngredientsAction,
  IGetIngredientsFailedAction,
  IGetIngredientsSuccessAction, IGetOrderNumberAction, IGetOrderNumberFailedAction, IGetOrderNumberSuccessAction,
  IRemoveBunFromConstructor, ISetBunInConstructor,
  ISetCurrentTabAction,
  ISetIngredientInConstructor
} from "../types/action-types/ingredientsActionsTypes";
import {TIngredient, TtypeIngredient} from "../types/ingredientTypes";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const SET_INGREDIENT_IN_CONSTRUCTOR: 'SET_INGREDIENT_IN_CONSTRUCTOR' = 'SET_INGREDIENT_IN_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR: 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR' = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const SET_BUN_IN_CONSTRUCTOR: 'SET_BUN_IN_CONSTRUCTOR' = 'SET_BUN_IN_CONSTRUCTOR';
export const REMOVE_BUN_FROM_CONSTRUCTOR: 'REMOVE_BUN_FROM_CONSTRUCTOR' = 'REMOVE_BUN_FROM_CONSTRUCTOR';
export const DRAG_CURRENT_ELEMENT: 'DRAG_CURRENT_ELEMENT' = 'DRAG_CURRENT_ELEMENT';
export const SET_DRAGGING_ELEMENT: 'SET_DRAGGING_ELEMENT' = 'SET_DRAGGING_ELEMENT';
export const SET_CURRENT_INGREDIENT: 'SET_CURRENT_INGREDIENT' = 'SET_CURRENT_INGREDIENT';
export const REMOVE_CURRENT_INGREDIENT: 'REMOVE_CURRENT_INGREDIENT' = 'REMOVE_CURRENT_INGREDIENT';

export const GET_ORDER_NUMBER_REQUEST: 'GET_ORDER_NUMBER_REQUEST' = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS: 'GET_ORDER_NUMBER_SUCCESS' = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED: 'GET_ORDER_NUMBER_FAILED' = 'GET_ORDER_NUMBER_FAILED';

export const GET_POSITION_TITLE: 'GET_POSITION_TITLE' = 'GET_POSITION_TITLE';
export const GET_CURRENT_TAB: 'GET_CURRENT_TAB' = 'GET_CURRENT_TAB';

export const getIngredientsAction = (): IGetIngredientsAction => ({
  type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED
});

export const getIngredientsSuccessAction = ( ingredientsData: ReadonlyArray<TIngredient>): IGetIngredientsSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredientsData
});

export const getIngredients:  AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsAction());
    getIngredientsRequest().then(res => {
      if (res) {
        dispatch(getIngredientsSuccessAction(res.data));
      } else {
        dispatch(getIngredientsFailedAction());
      }
    }).catch(err => {
      console.log('Ошибка, запрос на получение списка ингредиентов не выполнен', err);
    });
}
////////////////////////////////////////////////////////////////////////////////////////
export const setCurrentTabAction = ( item: TtypeIngredient): ISetCurrentTabAction => ({
  type: GET_CURRENT_TAB,
  item
});

export const setCurrentTab: AppThunk = (activeTab: TtypeIngredient) => (dispatch: AppDispatch) => {
  dispatch(setCurrentTabAction(activeTab));
}

// export function setCurrentTab(activeTab) {
//   return function (dispatch) {
//     dispatch({
//       type: GET_CURRENT_TAB,
//       item: activeTab
//     })
//   }
// }
///////////////////////////////////////////////////////////////////////////////////////
export const setIngredientInConstructorAction = (id: string, uuid: string): ISetIngredientInConstructor => ({
  type: SET_INGREDIENT_IN_CONSTRUCTOR,
  id,
  uuid
});

export const removeBunFromConstructorAction = (id: string, uuid: string, type: string): IRemoveBunFromConstructor => ({
  type: REMOVE_BUN_FROM_CONSTRUCTOR,
  id,
  uuid,
  ingr: type
});

export const setBunInConstructorAction = ( id: string, uuid: string, type: string): ISetBunInConstructor => ({
  type: SET_BUN_IN_CONSTRUCTOR,
  id,
  uuid,
  ingr: type
});


export const addIngredient: AppThunk = (id: string, uuid: string, type: string) => (dispatch: AppDispatch) =>  {
    if (type !== 'bun') {
      dispatch(setIngredientInConstructorAction(id, uuid));
    } else {
      dispatch(removeBunFromConstructorAction(id, uuid,type));
      dispatch(setBunInConstructorAction(id, uuid,type));
    }
  }
// export function addIngredient(type, id, uuid) {
//   return function (dispatch) {
//     if (type !== 'bun') {
//       dispatch({
//         type: SET_INGREDIENT_IN_CONSTRUCTOR,
//         id,
//         uuid
//       })
//     } else {
//       dispatch({
//         type: REMOVE_BUN_FROM_CONSTRUCTOR,
//         id,
//         uuid,
//         ingr: type
//       });
//       dispatch({
//         type: SET_BUN_IN_CONSTRUCTOR,
//         id,
//         uuid,
//         ingr: type
//       });
//     }
//   }
// }
////////////////////////////////////////////////////////////////////////
// export function getIngredients() {
//   return function (dispatch) {
//     dispatch({
//       type: GET_INGREDIENTS_REQUEST
//     });
//     getIngredientsRequest().then(res => {
//       if (res) {
//         dispatch({
//           type: GET_INGREDIENTS_SUCCESS,
//           items: res.data
//         });
//       } else {
//         dispatch({
//           type: GET_INGREDIENTS_FAILED
//         });
//       }
//     }).catch(err => {
//       console.log('Ошибка, запрос на получение списка ингредиентов не выполнен', err);
//     });
//   };
// }

export const getOrderNumberAction = (): IGetOrderNumberAction => ({
  type: GET_ORDER_NUMBER_REQUEST
});

export const getOrderNumberFailedAction = (): IGetOrderNumberFailedAction => ({
  type: GET_ORDER_NUMBER_FAILED
});

export const getOrderNumberSuccessAction = ( item: number): IGetOrderNumberSuccessAction => ({
  type: GET_ORDER_NUMBER_SUCCESS,
  item
});
export const getOrderNumber: AppThunk = (accessToken: string, data: string[]) => (dispatch: AppDispatch) =>  {
    dispatch(getOrderNumberAction());
    getOrderNumberRequest(accessToken, data).then(res => {
      if (res) {
        dispatch({
          type: GET_ORDER_NUMBER_SUCCESS,
          item: res.order.number
        });
      } else {
        dispatch(getOrderNumberFailedAction());
      }
    })
      .catch(err => {
        console.log('Ошибка, запрос на получение номера заказа не выполнен', err);
      });
  };
}




// export function getOrderNumber(accessToken, data) {
//   return function (dispatch) {
//     dispatch({
//       type: GET_ORDER_NUMBER_FAILED
//     });
//     getOrderNumberRequest(accessToken, data).then(res => {
//       if (res) {
//         dispatch({
//           type: GET_ORDER_NUMBER_SUCCESS,
//           item: res.order.number
//         });
//       } else {
//         dispatch({
//           type: GET_ORDER_NUMBER_FAILED
//         });
//       }
//     })
//       .catch(err => {
//         console.log('Ошибка, запрос на получение номера заказа не выполнен', err);
//       });
//   };
// }
