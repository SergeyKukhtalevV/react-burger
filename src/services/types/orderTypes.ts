export type TIngredientsOrder = {
  ingredients: string[];
}

export type TOrder = {
  _id: string;
  status: 'done' | 'pending' | 'created';
  name: 'string';
  number: number;
  createdAt: string;
  updateAt: string;
} & TIngredientsOrder;

export type TOrders<TOrder> = {
  orders: TOrder[];
}
