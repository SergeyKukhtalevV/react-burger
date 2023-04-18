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

