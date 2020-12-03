import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromAuth from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  loaded$ = this.store.pipe(select(AuthSelectors.getAuthLoaded));
  authError$ = this.store.pipe(select(AuthSelectors.getAuthError));
  user$ = this.store.pipe(select(AuthSelectors.getAuthUser));

  constructor(private store: Store<fromAuth.AuthState>) { }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
