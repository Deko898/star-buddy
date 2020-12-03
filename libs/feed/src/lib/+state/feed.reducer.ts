import { IFeed } from '../../../../models/feed';
import { FeedsActions, FeedsActionTypes } from './feed.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const FEED_FEATURE_KEY = 'feed';

export interface FeedsState extends EntityState<IFeed> {
  loading: boolean,
  feeds: IFeed[],
  error: Error,
  selectedFeedId: string
}

export const adapter: EntityAdapter<IFeed> = createEntityAdapter<IFeed>({});

export const initialState: FeedsState = adapter.getInitialState({
  loading: false,
  feeds: [],
  error: null,
  selectedFeedId: null
});

export function feedsReducer(
  state = initialState,
  action: FeedsActions
): FeedsState {
  switch (action.type) {
    case FeedsActionTypes.LoadFeeds:
      return { ...state, loading: true };

    case FeedsActionTypes.LoadFeedsSuccess: {
      return adapter.addAll(action.payload, { ...state, error: null });
    }
    case FeedsActionTypes.LoadFeedsSuccess: {
      return adapter.removeAll({ ...state, error: action.payload });
    }
    default:
      return state;
  }
}
