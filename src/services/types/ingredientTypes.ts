export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
  cnt?: number;
}
export type TTypeIngredient = 'Булки' | 'Соусы' | 'Начинки';

export type TIngredients<T> = {
  ingredients: T[];
}

export type TIngredientState = {
  ingredientsData: TIngredient[];
  dataRequest: boolean;
  dataFailed: boolean;

  ingredientsConstructor: TIngredient[];
  dragIngredientInConstructor: TIngredient;
  currentIngredient: TIngredient;

  createdOrder: TIngredient;

  orderNumber: number;
  orderNumberRequest: boolean;
  orderNumberFailed: boolean;

  tabsNames: {id: number, name: TTypeIngredient, type: 'bun' | 'sauce' | 'main'}[];
  scrollPosition: number | null;
  currentTab: TTypeIngredient;
}
export type TItem = {
  id: string;
  index: number;
}
