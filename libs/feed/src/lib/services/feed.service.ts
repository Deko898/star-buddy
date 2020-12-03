import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFeed } from '../../../../models/feed';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private _http: HttpClient) {}

  getFeeds(): Observable<IFeed[]> {
    return this._http.get<IFeed[]>('http://localhost:3000/feeds');
  }
}
