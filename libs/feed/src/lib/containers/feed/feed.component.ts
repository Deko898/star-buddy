import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IFeed } from '../../../../../models/feed';
import { FeedFacade } from '../../+state/feed.facade';
import { LoadFeeds } from '../../+state/feed.actions';

@Component({
  selector: 'star-buddy-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit {
  feeds$: Observable<IFeed[]> = this._feedFacade.feeds$;

  constructor(private _feedFacade: FeedFacade) { }

  ngOnInit(): void {
    this._feedFacade.dispatch(new LoadFeeds());
  }

}
