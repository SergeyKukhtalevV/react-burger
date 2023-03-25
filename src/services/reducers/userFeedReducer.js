import {
  WS_USER_FEED_CONNECTION_CLOSED,
  WS_USER_FEED_CONNECTION_ERROR,
  WS_USER_FEED_CONNECTION_SUCCESS,
  WS_USER_FEED_GET_MESSAGE
} from "../action-types";
import {REMOVE_CURRENT_ORDER_USER_FEED, SET_CURRENT_ORDER_USER_FEED} from "../actions/user-feed";
import {getCookie} from "../../utils/utils";

const initialStateUserFeed = {
  wsConnectedUserFeed: false,
  isErrorUserFeed: false,
  wsTakeMessageUserFeed: '',
  ordersUserFeed: [],
  currentOrderUserFeed: {}
}

export const userFeedReducer = (state = initialStateUserFeed, action) => {
  switch (action.type) {
    case WS_USER_FEED_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnectedUserFeed: true,
        isErrorUserFeed: false
      };
    }
    case WS_USER_FEED_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnectedUserFeed: false,
        isErrorUserFeed: true
      };
    }
    case WS_USER_FEED_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnectedUserFeed: false,
        isErrorUserFeed: false
      };
    }
    case WS_USER_FEED_GET_MESSAGE: {
      return {
        ...state,
        wsTakeMessageUserFeed: action.payload.message,
        ordersUserFeed: action.payload.orders.reverse()
      };
    }
    case SET_CURRENT_ORDER_USER_FEED: {
      return {
        ...state,
        currentOrderUserFeed: [...state.ordersUserFeed].filter(item => item._id === action.id)[0]
      };
    }
    case REMOVE_CURRENT_ORDER_USER_FEED: {
      return {
        ...state,
        currentOrderUserFeed: {}
      };
    }
    default: {
      return state
    }
  }
}
