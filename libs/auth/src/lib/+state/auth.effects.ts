import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { AuthActionTypes } from '../..';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { IUser } from '../../../../models';
import * as authActions from './auth.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    mergeMap((action: authActions.Login) =>
      this.authService
        .login(action.payload)
        .pipe(
          map((user: IUser) => new authActions.LoginSuccess(user)),
          catchError(error => of(new authActions.LoginFail(error)))
        )
    )
  );


  @Effect({ dispatch: false })
  navigateToProfile$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    map((action: authActions.LoginSuccess) => action.payload),
    tap(() => this.router.navigate([`/products`]))
  );
}