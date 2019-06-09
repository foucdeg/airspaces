import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { loginUser, logoutUser } from './actions';

export type LoginAction = ActionType<typeof loginUser.success | typeof loginUser.failure | typeof logoutUser>;

export type LoginState = Readonly<{
  token: string | null;
  loginError: string | null;
}>;

const initialState: LoginState = { token: null, loginError: null };

const reducer = (state: LoginState = initialState, action: AnyAction) => {
  const typedAction = action as LoginAction;
  switch (typedAction.type) {
    case getType(loginUser.success):
      return {
        ...state,
        token: typedAction.payload.token,
      };
    case getType(loginUser.failure):
      return {
        ...state,
        loginError: typedAction.payload.errorMessage,
      };
    case logoutUser.type:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
