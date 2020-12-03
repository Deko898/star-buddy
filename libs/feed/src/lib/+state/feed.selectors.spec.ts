import { FeedEntity } from './feed.models';
import { State, feedAdapter, initialState } from './feed.reducer';
import * as FeedSelectors from './feed.selectors';

describe('Feed Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFeedId = (it) => it['id'];
  const createFeedEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FeedEntity);

  let state;

  beforeEach(() => {
    state = {
      feed: feedAdapter.addAll(
        [
          createFeedEntity('PRODUCT-AAA'),
          createFeedEntity('PRODUCT-BBB'),
          createFeedEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Feed Selectors', () => {
    it('getAllFeed() should return the list of Feed', () => {
      const results = FeedSelectors.getAllFeed(state);
      const selId = getFeedId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = FeedSelectors.getSelected(state);
      const selId = getFeedId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getFeedLoaded() should return the current 'loaded' status", () => {
      const result = FeedSelectors.getFeedLoaded(state);

      expect(result).toBe(true);
    });

    it("getFeedError() should return the current 'error' state", () => {
      const result = FeedSelectors.getFeedError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
