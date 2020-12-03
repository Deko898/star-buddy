import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { FeedsActionTypes } from './feed.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { FeedService } from '../services/feed.service';
import { IFeed } from '../../../../models/feed';
import { of } from 'rxjs';
import * as feedActions from './../+state/feed.actions';

@Injectable()
export class FeedEffects {

  constructor(
    private actions$: Actions,
    private feedService: FeedService
  ) { }

  @Effect()
  loadFeeds$ = this.actions$.pipe(
    ofType(FeedsActionTypes.LoadFeeds),
    mergeMap(() =>
      this.feedService
        .getFeeds()
        .pipe(
          map(
            (feeds: IFeed[]) =>
              new feedActions.LoadFeedsSuccess(feeds)
          ),
          catchError(error => of(new feedActions.LoadFeedsFail(error)))
        )
    )
  );
}
