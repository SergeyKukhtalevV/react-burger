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
  REMOVE_BUN_FROM_CONSTRUCTOR,
  DRAG_CURRENT_ELEMENT,
  SET_DRAGGING_ELEMENT
} from '../actions/ingredients';
import {TIngredient, TIngredientState} from "../types/ingredientTypes";
import {TIngredientActions} from "../types/action-types/ingredientsActionsTypes";

const initialState: TIngredientState = {
  ingredientsData: [] as TIngredient[],
  dataRequest: false,
  dataFailed: false,

  ingredientsConstructor: [] as TIngredient[],
  dragIngredientInConstructor: {} as TIngredient,
  currentIngredient: {} as TIngredient,

  createdOrder: {} as TIngredient,

  orderNumber: 0,
  orderNumberRequest: false,
  orderNumberFailed: false,

  tabsNames: [{id: 1, name: 'Булки', type: 'bun'},
    {id: 2, name: 'Соусы', type: 'sauce'},
    {id: 3, name: 'Начинки', type: 'main'}],
  scrollPosition: null,
  currentTab: 'Булки'
};
export const ingredientReducer = (state = initialState, action: TIngredientActions): TIngredientState => {
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
        ingredientsConstructor: [...state.ingredientsConstructor, {
          ...[...state.ingredientsData].filter(item =>
            item._id === action.id)[0], uuid: action.uuid
        }]
      }
    }
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsData: [...state.ingredientsData].map(item =>
          item._id === action.id ? {...item, __v: --item.__v} : item),
        ingredientsConstructor: [...state.ingredientsConstructor.filter(item =>
          item.uuid !== action.uuid)]
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
        currentIngredient: {} as TIngredient
      }
    }
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumberRequest: true,
        orderNumber: 0,
        ingredientsConstructor: [[...state.ingredientsConstructor]
          .filter(info => info.type === 'bun')[0],
          ...state.ingredientsConstructor.filter(info => info.type !== 'bun'),
          [...state.ingredientsConstructor].filter(info => info.type === 'bun')[0]]
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state, orderNumberFailed: false, orderNumber: action.item,
        orderNumberRequest: false,
        ingredientsData: [...state.ingredientsData].map(item => [{...item, __v: 0}][0]),
        ingredientsConstructor: []
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
