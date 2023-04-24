import {applyMiddleware, legacy_createStore as createStore, compose} from 'redux';
import {rootReducer} from './reducers/rootReducer';
import {socketMiddleware} from './middleware';
import thunkMiddleware from 'redux-thunk';
import {WS_URL} from "../constants/constants";


import {
  TFeedActions,
  TUserFeedActions,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
  WS_USER_FEED_CONNECTION_CLOSED,
  WS_USER_FEED_CONNECTION_ERROR,
  WS_USER_FEED_CONNECTION_START,
  WS_USER_FEED_CONNECTION_SUCCESS,
  WS_USER_FEED_GET_MESSAGE,
  WS_USER_FEED_SEND_MESSAGE
} from './action-types';


const wsFeedActions: TFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE
};
const wsUserFeedActions: TUserFeedActions = {
  wsInit: WS_USER_FEED_CONNECTION_START,
  wsSendMessage: WS_USER_FEED_SEND_MESSAGE,
  onOpen: WS_USER_FEED_CONNECTION_SUCCESS,
  onClose: WS_USER_FEED_CONNECTION_CLOSED,
  onError: WS_USER_FEED_CONNECTION_ERROR,
  onMessage: WS_USER_FEED_GET_MESSAGE
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  export const initStore = (initialState = {}) =>
  createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      socketMiddleware(`${WS_URL}/all`, wsFeedActions),
      socketMiddleware(WS_URL, wsUserFeedActions)
    )));
