import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as authActions from './../../+state/auth.actions';
import { AuthFacade } from '../../+state/auth.facade';

@Component({
  selector: 'star-buddy-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  constructor(private _authFacade: AuthFacade) { }

  ngOnInit(): void {
  }

  login(authenticate: any) {
    this._authFacade.dispatch(new authActions.Login(authenticate));
  }
}
