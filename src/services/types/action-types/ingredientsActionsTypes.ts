import {TIngredient, TtypeIngredient} from "../ingredientTypes";
import {
  DRAG_CURRENT_ELEMENT,
  GET_CURRENT_TAB,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  REMOVE_BUN_FROM_CONSTRUCTOR, REMOVE_CURRENT_INGREDIENT, REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SET_BUN_IN_CONSTRUCTOR, SET_CURRENT_INGREDIENT, SET_DRAGGING_ELEMENT,
  SET_INGREDIENT_IN_CONSTRUCTOR
} from "../../actions";

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly items: ReadonlyArray<TIngredient>;

}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface ISetCurrentTabAction {
  readonly type: typeof GET_CURRENT_TAB;
  readonly item: TtypeIngredient;
}

export interface ISetIngredientInConstructor {
  readonly type: typeof SET_INGREDIENT_IN_CONSTRUCTOR;
  readonly id: string;
  readonly uuid: string;
}

export interface IRemoveIngredientFromConstructor {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly id: string;
  readonly uuid: string;
}

export interface IRemoveBunFromConstructor {
  readonly type: typeof REMOVE_BUN_FROM_CONSTRUCTOR;
  readonly id: string;
  readonly uuid: string;
  readonly ingr: string;
}

export interface ISetBunInConstructor {
  readonly type: typeof SET_BUN_IN_CONSTRUCTOR;
  readonly id: string;
  readonly uuid: string;
  readonly ingr: string;
}

export interface IGetOrderNumberAction {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumberSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly item: number;

}

export interface IGetOrderNumberFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface IDragCurrentElementAction {
  readonly type: typeof DRAG_CURRENT_ELEMENT;
  readonly dragIndex: number;
}

export interface ISetDragElementAction {
  readonly type: typeof SET_DRAGGING_ELEMENT;
  readonly hoverIndex: number;
}

export interface ISetCurrentIngredientAction {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  readonly id: string;
}

export interface IRemoveCurrentIngredientAction {
  readonly type: typeof REMOVE_CURRENT_INGREDIENT;
}

export type TIngredientActions =
  | IGetIngredientsAction
  | IGetOrderNumberAction
  | ISetBunInConstructor
  | IRemoveBunFromConstructor
  | IGetOrderNumberFailedAction
  | IGetIngredientsSuccessAction
  | IGetOrderNumberSuccessAction
  | ISetCurrentTabAction
  | ISetIngredientInConstructor
  | IRemoveIngredientFromConstructor
  | IGetIngredientsFailedAction
  | IDragCurrentElementAction
  | ISetDragElementAction
  | ISetCurrentIngredientAction
  | IRemoveCurrentIngredientAction;
