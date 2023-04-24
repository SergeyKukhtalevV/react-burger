import {TOrder, TWsFeedSuccess} from "../types/orderTypes";
import {
  IWsFeedConnectionClosedAction,
  IWsFeedConnectionErrorAction,
  IWsFeedConnectionStartAction,
  IWsFeedConnectionSuccessAction,
  IWsFeedGetMessageAction,
  IWsFeedSendMessageAction,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
  WS_FEED_CONNECTION_CLOSED
} from "../action-types";

export const SET_CURRENT_ORDER_FEED: 'SET_CURRENT_ORDER_FEED' = 'SET_CURRENT_ORDER_FEED';
export const REMOVE_CURRENT_ORDER_FEED: 'REMOVE_CURRENT_ORDER_FEED' = 'REMOVE_CURRENT_ORDER_FEED';

export interface ISetCurrentOrderFeedAction {
  readonly type: typeof SET_CURRENT_ORDER_FEED;
  readonly id: string;
}

export interface IRemoveCurrentOrderFeedAction {
  readonly type: typeof REMOVE_CURRENT_ORDER_FEED;
}

export const setCurrentOrderFeedAction = (id: string): ISetCurrentOrderFeedAction => ({
  type: SET_CURRENT_ORDER_FEED,
  id
});

export const removeCurrentOrderFeedAction = (): IRemoveCurrentOrderFeedAction => ({
  type: REMOVE_CURRENT_ORDER_FEED
});

export const wsFeedConnectionStartAction = () : IWsFeedConnectionStartAction => ({
  type: WS_FEED_CONNECTION_START
});

export const wsFeedConnectionSuccessAction = () : IWsFeedConnectionSuccessAction => ({
  type: WS_FEED_CONNECTION_SUCCESS
});

export const wsFeedConnectionErrorAction = () : IWsFeedConnectionErrorAction => ({
  type: WS_FEED_CONNECTION_ERROR
});

export const wsFeedConnectionClosedAction = () : IWsFeedConnectionClosedAction => ({
  type: WS_FEED_CONNECTION_CLOSED
});

export const wsFeedGetMessageAction = (payload: TWsFeedSuccess<TOrder>) : IWsFeedGetMessageAction => ({
  type: WS_FEED_GET_MESSAGE,
  payload
});

export const wsFeedSendMessageAction = () : IWsFeedSendMessageAction => ({
  type: WS_FEED_SEND_MESSAGE
});
