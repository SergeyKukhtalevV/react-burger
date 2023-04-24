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

export type TWsFeedSuccess<T> = {
  success: boolean;
  total: number;
  totalToday: number;
  orders: T[];
  message?: string;
};

export type TWsFeedCurrentOrder = {
  id: string;
}

export type TWsFeedState = {
  wsConnected: boolean;
  isError: boolean;
  orders: TOrder[];
  ordersTotal: number;
  totalToday: number,
  currentOrder: TOrder,
  ordersDone: (number | null)[],
  ordersPending: (number | null)[]
}

export type TWsUserFeedState = {
  wsConnectedUserFeed: boolean;
  isErrorUserFeed: boolean;
  wsTakeMessageUserFeed: string | undefined;
  ordersUserFeed: TOrder[];
  currentOrderUserFeed: TOrder;
}
