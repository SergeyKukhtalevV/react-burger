import {TIngredient} from "../ingredientTypes";
import {
  GET_CURRENT_TAB,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  REMOVE_BUN_FROM_CONSTRUCTOR, SET_BUN_IN_CONSTRUCTOR,
  SET_INGREDIENT_IN_CONSTRUCTOR
} from "../../actions";

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredientsData: ReadonlyArray<TIngredient>;

}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface ISetCurrentTabAction {
  readonly type: typeof GET_CURRENT_TAB;
  readonly item: 'Булки' | 'Соусы' | 'Начинки';
}

export interface ISetIngredientInConstructor {
  readonly type: typeof SET_INGREDIENT_IN_CONSTRUCTOR;
  readonly id: string;
  readonly uuid: string;
}

export interface IRemoveBunFromConstructor {
  readonly type: typeof REMOVE_BUN_FROM_CONSTRUCTOR;
  readonly id: string;
  readonly uuid: string;
  readonly ingr: string;
}

export interface ISetBunFromConstructor {
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

export type TIngredientActions =
  | IGetIngredientsAction
  | IGetOrderNumberAction
  | ISetBunFromConstructor
  | IRemoveBunFromConstructor
  | IGetOrderNumberFailedAction
  | IGetIngredientsSuccessAction
  | IGetOrderNumberSuccessAction
  | ISetCurrentTabAction
  | ISetIngredientInConstructor
  | IGetIngredientsFailedAction;
