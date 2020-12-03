import { Action } from '@ngrx/store';

export enum FeedsActionTypes {
  LoadFeeds = '[Feeds Page] Load Feeds',
  LoadFeedsSuccess = '[Feeds API] Load Feeds Success',
  LoadFeedsFail = '[Feeds API] LoadFeeds Fail'
}

export class LoadFeeds implements Action {
  readonly type = FeedsActionTypes.LoadFeeds;
}
export class LoadFeedsSuccess implements Action {
  readonly type = FeedsActionTypes.LoadFeedsSuccess;
  constructor(public payload: any) {}
}

export class LoadFeedsFail implements Action {
  readonly type = FeedsActionTypes.LoadFeedsFail;
  constructor(public payload: any) {}
}

export type FeedsActions = LoadFeeds | LoadFeedsSuccess | LoadFeedsFail;