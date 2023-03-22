import {
  WS_USER_FEED_CONNECTION_CLOSED,
  WS_USER_FEED_CONNECTION_ERROR,
  WS_USER_FEED_CONNECTION_SUCCESS,
  WS_USER_FEED_GET_MESSAGE
} from "../action-types";
import {REMOVE_CURRENT_ORDER_USER_FEED, SET_CURRENT_ORDER_USER_FEED} from "../actions/user-feed";

const initialStateUserFeed = {
  wsConnected: false,
  isError: false,
  orders: [],
  currentOrder: {}
}

export const userFeedReducer = (state = initialStateUserFeed, action) => {
  switch (action.type) {
    case WS_USER_FEED_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
        isError: false
      };
    }
    case WS_USER_FEED_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
        isError: true
      };
    }
    case WS_USER_FEED_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        isError: false
      };
    }
    case WS_USER_FEED_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders
      };
    }
    case SET_CURRENT_ORDER_USER_FEED: {
      return {
        ...state,
        currentOrder: [...state.orders].filter(item => item._id === action.id)[0]
      };
    }
    case REMOVE_CURRENT_ORDER_USER_FEED: {
      return {
        ...state,
        currentOrder: {}
      };
    }
    default: {
      return state
    }
  }
}
