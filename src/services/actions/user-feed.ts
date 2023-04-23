export const SET_CURRENT_ORDER_USER_FEED: 'SET_CURRENT_ORDER_USER_FEED' = 'SET_CURRENT_ORDER_USER_FEED';
export const REMOVE_CURRENT_ORDER_USER_FEED: 'REMOVE_CURRENT_ORDER_USER_FEED' = 'REMOVE_CURRENT_ORDER_USER_FEED';

export interface ISetCurrentOrderUserFeedAction {
  readonly type: typeof SET_CURRENT_ORDER_USER_FEED;
}

export interface IRemoveCurrentOrderUserFeedAction {
  readonly type: typeof REMOVE_CURRENT_ORDER_USER_FEED;
}

export const setCurrentOrderUserFeedAction = (): ISetCurrentOrderUserFeedAction => ({
  type: SET_CURRENT_ORDER_USER_FEED
});

export const removeCurrentOrderUserFeedAction = (): IRemoveCurrentOrderUserFeedAction => ({
  type: REMOVE_CURRENT_ORDER_USER_FEED
});
