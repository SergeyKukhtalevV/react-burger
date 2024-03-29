import {TOrder, TWsFeedSuccess} from "../types/orderTypes";
import {
  IWsUserFeedConnectionClosedAction,
  IWsUserFeedConnectionErrorAction,
  IWsUserFeedConnectionStartAction,
  IWsUserFeedConnectionSuccessAction,
  IWsUserFeedGetMessageAction,
  IWsUserFeedSendMessageAction,
  WS_USER_FEED_CONNECTION_CLOSED,
  WS_USER_FEED_CONNECTION_ERROR,
  WS_USER_FEED_CONNECTION_START,
  WS_USER_FEED_CONNECTION_SUCCESS, WS_USER_FEED_GET_MESSAGE, WS_USER_FEED_SEND_MESSAGE
} from "../action-types";

export const SET_CURRENT_ORDER_USER_FEED: 'SET_CURRENT_ORDER_USER_FEED' = 'SET_CURRENT_ORDER_USER_FEED';
export const REMOVE_CURRENT_ORDER_USER_FEED: 'REMOVE_CURRENT_ORDER_USER_FEED' = 'REMOVE_CURRENT_ORDER_USER_FEED';

export interface ISetCurrentOrderUserFeedAction {
  readonly type: typeof SET_CURRENT_ORDER_USER_FEED;
  readonly id: string;
}

export interface IRemoveCurrentOrderUserFeedAction {
  readonly type: typeof REMOVE_CURRENT_ORDER_USER_FEED;
}

export const setCurrentOrderUserFeedAction = (id: string): ISetCurrentOrderUserFeedAction => ({
  type: SET_CURRENT_ORDER_USER_FEED,
  id
});

export const removeCurrentOrderUserFeedAction = (): IRemoveCurrentOrderUserFeedAction => ({
  type: REMOVE_CURRENT_ORDER_USER_FEED
});

export const wsUserFeedConnectionStartAction = () : IWsUserFeedConnectionStartAction => ({
  type: WS_USER_FEED_CONNECTION_START
});

export const wsUserFeedConnectionSuccessAction = () : IWsUserFeedConnectionSuccessAction => ({
  type: WS_USER_FEED_CONNECTION_SUCCESS
});

export const wsUserFeedConnectionErrorAction = () : IWsUserFeedConnectionErrorAction => ({
  type: WS_USER_FEED_CONNECTION_ERROR
});

export const wsUserFeedConnectionClosedAction = () : IWsUserFeedConnectionClosedAction => ({
  type: WS_USER_FEED_CONNECTION_CLOSED
});

export const wsUserFeedGetMessageAction = (payload: TWsFeedSuccess<TOrder>) : IWsUserFeedGetMessageAction => ({
  type: WS_USER_FEED_GET_MESSAGE,
  payload
});

export const wsUserFeedSendMessageAction = () : IWsUserFeedSendMessageAction => ({
  type: WS_USER_FEED_SEND_MESSAGE
});
