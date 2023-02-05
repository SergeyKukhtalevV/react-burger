import {combineReducers} from 'redux';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_INGREDIENT_IN_CONSTRUCTOR,
  SET_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  GET_CURRENT_TAB,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SET_BUN_IN_CONSTRUCTOR,
  REMOVE_BUN_FROM_CONSTRUCTOR, DRAG_CURRENT_ELEMENT, SET_DRAGGING_ELEMENT
} from '../actions/ingredients';

const initialState = {
  ingredientsData: [],
  dataRequest: false,
  dataFailed: false,

  ingredientsConstructor: [],
  dragIngredientInConstructor: {},
  currentIngredient: {},

  createdOrder: {},

  orderNumber: null,
  orderNumberRequest: false,
  orderNumberFailed: false,

  tabsNames: [{id: 1, name: 'Булки', type: 'bun'},
    {id: 2, name: 'Соусы', type: 'sauce'},
    {id: 3, name: 'Начинки', type: 'main'}],
  scrollPosition: null,
  currentTab: 'Булки'
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
    case SET_INGREDIENT_IN_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsData: [...state.ingredientsData].map(item =>
          item._id === action.id ? {...item, __v: ++item.__v} : item),
        ingredientsConstructor: [...state.ingredientsConstructor, ([...state.ingredientsData].filter(item =>
          item._id === action.id)[0])]
      }
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsData: [...state.ingredientsData].map(item =>
          item._id === action.id ? {...item, __v: --item.__v} : item),
        ingredientsConstructor: [...state.ingredientsConstructor.filter((item, i) =>
          i !== action.index || item._id !== action.id)]
      }
    }
    case SET_BUN_IN_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsData: [...state.ingredientsData].map(item =>
          item._id === action.id ? {...item, __v: (item.__v++ + ++item.__v)} : item),
        ingredientsConstructor: [...state.ingredientsConstructor, ([...state.ingredientsData].filter(item =>
          item._id === action.id)[0])]
      }
    }
    case REMOVE_BUN_FROM_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsData: [...state.ingredientsData].map(item =>
          item.type === action.ingr ? {...item, __v: 0} : item),
        ingredientsConstructor: [...state.ingredientsConstructor.filter((item) =>
          item.type !== action.ingr)]
      }
    }
    case DRAG_CURRENT_ELEMENT: {
      return {
        ...state,
        dragIngredientInConstructor: [...state.ingredientsConstructor.splice(action.dragIndex, 1)][0]
      }
    }
    case SET_DRAGGING_ELEMENT: {
      return {
        ...state,
        ...state.ingredientsConstructor.splice(action.hoverIndex, 0,
          {...state.dragIngredientInConstructor})
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
    case GET_CURRENT_TAB: {
      return {
        ...state, currentTab: action.item
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
