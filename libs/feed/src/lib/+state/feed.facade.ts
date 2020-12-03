import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromFeed from './feed.reducer';
import * as FeedSelectors from './feed.selectors';

@Injectable()
export class FeedFacade {
  loaded$ = this.store.pipe(select(FeedSelectors.getFeedLoaded));
  feeds$ = this.store.pipe(select(FeedSelectors.getAllFeed));
  selectedFeed$ = this.store.pipe(select(FeedSelectors.getSelected));

  constructor(private store: Store<fromFeed.FeedsState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
