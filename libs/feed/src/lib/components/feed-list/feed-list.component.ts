import { Component, OnInit, Input } from '@angular/core';
import { IFeed } from '../../../../../models/feed';

@Component({
  selector: 'star-buddy-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss']
})
export class FeedListComponent implements OnInit {
  @Input() feeds: IFeed[]
  constructor() { }

  ngOnInit(): void {
  }

}
