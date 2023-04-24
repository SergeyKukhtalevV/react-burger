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

export type TWsFeedSuccess = {
  success: boolean;
  total: number;
  totalToday: number;
} & TOrder[];

export type TWsFeedCurrentOrder = {
  id: string;
}
export type TOrders<T> = {
  orders: T[];
}
export type TWsFeedState = {
  wsConnected: boolean;
  isError: boolean;
  orders: TOrder[];
  ordersTotal: number;
  totalToday: number,
  currentOrder: TOrder,
  ordersDone: TOrder[],
  ordersPending: TOrder[]
}
