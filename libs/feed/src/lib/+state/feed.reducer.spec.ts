import { FeedEntity } from './feed.models';
import * as FeedActions from './feed.actions';
import { State, initialState, reducer } from './feed.reducer';

describe('Feed Reducer', () => {
  const createFeedEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FeedEntity);

  beforeEach(() => {});

  describe('valid Feed actions', () => {
    it('loadFeedSuccess should return set the list of known Feed', () => {
      const feed = [
        createFeedEntity('PRODUCT-AAA'),
        createFeedEntity('PRODUCT-zzz'),
      ];
      const action = FeedActions.loadFeedSuccess({ feed });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
