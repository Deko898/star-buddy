import { AuthActionTypes, AuthActions } from './auth.actions';
import { IUser } from '../../../../models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  loading: boolean;
  user: IUser;
  error: Error
}

export const initialState: AuthState = {
  error: null,
  user: null,
  loading: false
};

export function authReducer(
  state = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login:
      return { ...state, loading: true };

    case AuthActionTypes.LoginSuccess: {
      return { ...state, user: action.payload, loading: false };
    }
    case AuthActionTypes.LoginFail: {
      return { ...state, user: null, loading: false };
    }
    default:
      return state;
  }
}
