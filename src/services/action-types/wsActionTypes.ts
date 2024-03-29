import {TOrder, TWsFeedSuccess} from "../types/orderTypes";
import {
  IRemoveCurrentOrderFeedAction,
  ISetCurrentOrderFeedAction
} from "../actions";
import {IRemoveCurrentOrderUserFeedAction, ISetCurrentOrderUserFeedAction} from "../actions/user-feed";

export const WS_FEED_CONNECTION_START: 'WS_FEED_CONNECTION_START' = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_SUCCESS: 'WS_FEED_CONNECTION_SUCCESS' = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR: 'WS_FEED_CONNECTION_ERROR' = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED: 'WS_FEED_CONNECTION_CLOSED' = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_MESSAGE: 'WS_FEED_GET_MESSAGE' = 'WS_FEED_GET_MESSAGE';
export const WS_FEED_SEND_MESSAGE: 'WS_FEED_SEND_MESSAGE' = 'WS_FEED_SEND_MESSAGE';

export const WS_USER_FEED_CONNECTION_START: 'WS_USER_FEED_CONNECTION_START' = 'WS_USER_FEED_CONNECTION_START';
export const WS_USER_FEED_CONNECTION_SUCCESS: 'WS_USER_FEED_CONNECTION_SUCCESS' = 'WS_USER_FEED_CONNECTION_SUCCESS';
export const WS_USER_FEED_CONNECTION_ERROR: 'WS_USER_FEED_CONNECTION_ERROR' = 'WS_USER_FEED_CONNECTION_ERROR';
export const WS_USER_FEED_CONNECTION_CLOSED: 'WS_USER_FEED_CONNECTION_CLOSED' = 'WS_USER_FEED_CONNECTION_CLOSED';
export const WS_USER_FEED_GET_MESSAGE: 'WS_USER_FEED_GET_MESSAGE' = 'WS_USER_FEED_GET_MESSAGE';
export const WS_USER_FEED_SEND_MESSAGE: 'WS_USER_FEED_SEND_MESSAGE' = 'WS_USER_FEED_SEND_MESSAGE';

export interface IWsFeedConnectionStartAction {
  readonly type: typeof WS_FEED_CONNECTION_START;
}

export interface IWsFeedConnectionSuccessAction {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

export interface IWsFeedConnectionErrorAction {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
}

export interface IWsFeedConnectionClosedAction {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

export interface IWsFeedGetMessageAction {
  readonly type: typeof WS_FEED_GET_MESSAGE;
  readonly payload: TWsFeedSuccess<TOrder>;
}

export interface IWsFeedSendMessageAction {
  readonly type: typeof WS_FEED_SEND_MESSAGE;
}

export type TWsFeedActions =
  | IWsFeedConnectionStartAction
  | IWsFeedConnectionSuccessAction
  | IWsFeedConnectionErrorAction
  | IWsFeedConnectionClosedAction
  | IWsFeedGetMessageAction
  | IWsFeedSendMessageAction
  | ISetCurrentOrderFeedAction
  | IRemoveCurrentOrderFeedAction;

export type TFeedActions = {
  wsInit: typeof WS_FEED_CONNECTION_START,
  wsSendMessage: typeof WS_FEED_SEND_MESSAGE,
  onOpen: typeof WS_FEED_CONNECTION_SUCCESS,
  onClose: typeof WS_FEED_CONNECTION_CLOSED,
  onError: typeof WS_FEED_CONNECTION_ERROR,
  onMessage: typeof WS_FEED_GET_MESSAGE
};
//////////////////////////////////////////////////////////////

export interface IWsUserFeedConnectionStartAction {
  readonly type: typeof WS_USER_FEED_CONNECTION_START;
}

export interface IWsUserFeedConnectionSuccessAction {
  readonly type: typeof WS_USER_FEED_CONNECTION_SUCCESS;
}

export interface IWsUserFeedConnectionErrorAction {
  readonly type: typeof WS_USER_FEED_CONNECTION_ERROR;
}

export interface IWsUserFeedConnectionClosedAction {
  readonly type: typeof WS_USER_FEED_CONNECTION_CLOSED;
}

export interface IWsUserFeedGetMessageAction {
  readonly type: typeof WS_USER_FEED_GET_MESSAGE;
  readonly payload: TWsFeedSuccess<TOrder>;
}

export interface IWsUserFeedSendMessageAction {
  readonly type: typeof WS_USER_FEED_SEND_MESSAGE;
}

export type TWsUserFeedActions =
  | IWsUserFeedConnectionStartAction
  | IWsUserFeedConnectionSuccessAction
  | IWsUserFeedConnectionErrorAction
  | IWsUserFeedConnectionClosedAction
  | IWsUserFeedGetMessageAction
  | IWsUserFeedSendMessageAction
  | ISetCurrentOrderUserFeedAction
  | IRemoveCurrentOrderUserFeedAction;


export type TUserFeedActions = {
  wsInit: typeof WS_USER_FEED_CONNECTION_START,
  wsSendMessage: typeof WS_USER_FEED_SEND_MESSAGE,
  onOpen: typeof WS_USER_FEED_CONNECTION_SUCCESS,
  onClose: typeof WS_USER_FEED_CONNECTION_CLOSED,
  onError: typeof WS_USER_FEED_CONNECTION_ERROR,
  onMessage: typeof WS_USER_FEED_GET_MESSAGE
};
