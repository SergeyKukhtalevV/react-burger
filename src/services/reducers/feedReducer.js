import {SET_CURRENT_ORDER_FEED, REMOVE_CURRENT_ORDER_FEED} from "../actions/feed";
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE
} from "../action-types";

const initialStateFeed = {
  wsConnected: false,
  isError: false,
  orders: [],
  ordersTotal: 0,
  totalToday: 0,
  currentOrder: {
    order: {},
    ingredients: [],
    total: 0
  },
  ordersDone: [],
  ordersPending: []
}

export const feedReducer = (state = initialStateFeed, action) => {
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
        currentOrder: {
          order: action.selectedOrder,
          ingredients: action.selectedIngrtdients,
          total: action.selectedTotal
        }
      };
    }
    case REMOVE_CURRENT_ORDER_FEED: {
      return {
        ...state,
        currentOrder: {
          order: {},
          ingredients: [],
          total: 0
        }
      };
    }
    default: {
      return state
    }
  }
}
