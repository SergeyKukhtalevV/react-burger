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
}
export type TtypeIngredient = 'Булки' | 'Соусы' | 'Начинки';

export type TIngredients<TIngredient> = {
  ingredients: TIngredient[];
}

export type TIngredientState<TIngredient> = {
  ingredientsData: TIngredient[];
  dataRequest: boolean;
  dataFailed: boolean;

  ingredientsConstructor: TIngredient[];
  dragIngredientInConstructor: TIngredient;
  currentIngredient: TIngredient;

  createdOrder: TIngredient;

  orderNumber: number | null;
  orderNumberRequest: boolean;
  orderNumberFailed: boolean;

  tabsNames: {id: number, name: 'Булки' | 'Соусы' | 'Начинки', type: 'bun' | 'sauce' | 'main'}[];
  scrollPosition: number | null;
  currentTab: 'Булки' | 'Соусы' | 'Начинки';
}
