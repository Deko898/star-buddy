import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { FeedEffects } from './feed.effects';
import * as FeedActions from './feed.actions';

describe('FeedEffects', () => {
  let actions: Observable<any>;
  let effects: FeedEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        FeedEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(FeedEffects);
  });

  describe('loadFeed$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FeedActions.loadFeed() });

      const expected = hot('-a-|', {
        a: FeedActions.loadFeedSuccess({ feed: [] }),
      });

      expect(effects.loadFeed$).toBeObservable(expected);
    });
  });
});
