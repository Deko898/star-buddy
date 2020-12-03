import { Action } from '@ngrx/store';
import { IAuthenticate, IUser } from '../../../../models';

export enum AuthActionTypes {
  Login = '[Auth Page] Login',
  LoginSuccess = '[Auth API] Login Success',
  LoginFail = '[Auth API] Login Fail'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: IAuthenticate) {}
}
export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: IUser) {}
}

export class LoginFail implements Action {
  readonly type = AuthActionTypes.LoginFail;
  constructor(public payload: any) {}
}

export type AuthActions = Login | LoginSuccess | LoginFail;
