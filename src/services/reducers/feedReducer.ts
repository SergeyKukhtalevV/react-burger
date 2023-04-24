import {SET_CURRENT_ORDER_FEED, REMOVE_CURRENT_ORDER_FEED} from "../actions";
import {
  TWsFeedActions,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE
} from "../action-types";
import {TOrder, TWsFeedState} from "../types/orderTypes";

const initialStateFeed: TWsFeedState = {
  wsConnected: false,
  isError: false,
  orders: [] as TOrder[],
  ordersTotal: 0,
  totalToday: 0,
  currentOrder: {} as TOrder,
  ordersDone: [],
  ordersPending: []
}

export const feedReducer = (state = initialStateFeed, action: TWsFeedActions): TWsFeedState => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        isError: false
      };
    }
    case WS_FEED_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        isError: true
      };
    }
    case WS_FEED_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        isError: false
      };
    }
    case WS_FEED_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        ordersDone: action.payload.orders.map(item => item.status === 'done' ? item.number : null),
        ordersPending: action.payload.orders.map(item => item.status === 'pending' ? item.number : null),
        ordersTotal: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }
    case SET_CURRENT_ORDER_FEED: {
      return {
        ...state,
        currentOrder: [...state.orders].filter(item => item._id === action.id)[0]
      };
    }
    case REMOVE_CURRENT_ORDER_FEED: {
      return {
        ...state,
        currentOrder: {} as TOrder
      };
    }
    default: {
      return state
    }
  }
}
