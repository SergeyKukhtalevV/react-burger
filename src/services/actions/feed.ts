export const SET_CURRENT_ORDER_FEED: 'SET_CURRENT_ORDER_FEED' = 'SET_CURRENT_ORDER_FEED';
export const REMOVE_CURRENT_ORDER_FEED: 'REMOVE_CURRENT_ORDER_FEED' = 'REMOVE_CURRENT_ORDER_FEED';

export interface ISetCurrentOrderFeedAction {
  readonly type: typeof SET_CURRENT_ORDER_FEED;
}

export interface IRemoveCurrentOrderFeedAction {
  readonly type: typeof REMOVE_CURRENT_ORDER_FEED;
}

export const setCurrentOrderFeedAction = (): ISetCurrentOrderFeedAction => ({
  type: SET_CURRENT_ORDER_FEED
});

export const removeCurrentOrderFeedAction = (): IRemoveCurrentOrderFeedAction => ({
  type: REMOVE_CURRENT_ORDER_FEED
});
