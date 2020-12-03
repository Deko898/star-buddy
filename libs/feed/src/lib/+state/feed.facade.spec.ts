import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { FeedEntity } from './feed.models';
import { FeedEffects } from './feed.effects';
import { FeedFacade } from './feed.facade';

import * as FeedSelectors from './feed.selectors';
import * as FeedActions from './feed.actions';
import { FEED_FEATURE_KEY, State, initialState, reducer } from './feed.reducer';

interface TestSchema {
  feed: State;
}

describe('FeedFacade', () => {
  let facade: FeedFacade;
  let store: Store<TestSchema>;
  const createFeedEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FeedEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(FEED_FEATURE_KEY, reducer),
          EffectsModule.forFeature([FeedEffects]),
        ],
        providers: [FeedFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(FeedFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allFeed$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(FeedActions.loadFeed());

        list = await readFirst(facade.allFeed$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadFeedSuccess` to manually update list
     */
    it('allFeed$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allFeed$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          FeedActions.loadFeedSuccess({
            feed: [createFeedEntity('AAA'), createFeedEntity('BBB')],
          })
        );

        list = await readFirst(facade.allFeed$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
