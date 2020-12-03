import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthFacade } from '../../+state/auth.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private _authFacade: AuthFacade) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this._authFacade.user$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate([`/auth/login`]);
          return false;
        }
      })
    );
  }

}
