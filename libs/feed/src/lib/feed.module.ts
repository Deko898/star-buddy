import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeedComponent } from './containers/feed/feed.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromFeed from './+state/feed.reducer';
import { FeedEffects } from './+state/feed.effects';
import { FeedFacade } from './+state/feed.facade';
import { FeedListComponent } from './components/feed-list/feed-list.component';
import { MaterialModule } from '../../../material/src/lib/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: FeedComponent },
    ]),
    StoreModule.forFeature(fromFeed.FEED_FEATURE_KEY, fromFeed.feedsReducer),
    MaterialModule,
    EffectsModule.forFeature([FeedEffects]),
  ],
  declarations: [FeedComponent, FeedListComponent],
  providers: [FeedFacade],
})
export class FeedModule {}
