import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthenticate, IUser } from '../../../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) { }

  login(authenticate: IAuthenticate): Observable<IUser> {
    return this._http.post<IUser>('http://localhost:3000/login', authenticate);
  }
}