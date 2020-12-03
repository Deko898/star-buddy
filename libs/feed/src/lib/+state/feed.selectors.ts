import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FEED_FEATURE_KEY,
  adapter,
  FeedsState,
} from './feed.reducer';

export const getFeedState = createFeatureSelector<FeedsState>(
  FEED_FEATURE_KEY
);

const { selectAll, selectEntities, selectTotal, selectIds } = adapter.getSelectors();

export const getFeedLoaded = createSelector(
  getFeedState,
  (state: FeedsState) => state.loading
);

export const getFeedError = createSelector(
  getFeedState,
  (state: FeedsState) => state.error
);

export const getAllFeed = createSelector(getFeedState, (state: FeedsState) =>
  selectAll(state)
);

export const getFeedEntities = createSelector(getFeedState, (state: FeedsState) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getFeedState,
  (state: FeedsState) => state.selectedFeedId
);

export const getSelected = createSelector(
  getFeedEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
