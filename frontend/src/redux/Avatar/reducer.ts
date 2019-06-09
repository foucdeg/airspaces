import { ActionType, getType } from 'typesafe-actions';

import { AnyAction } from 'redux';
import { fetchUser, updateUsername } from './actions';

export type AvatarAction = ActionType<typeof updateUsername | typeof fetchUser.success>;

export type AvatarState = Readonly<{
  userAvatarUrl: string | null;
  username: string | null;
}>;

const initialState: AvatarState = {
  userAvatarUrl: null,
  username: null,
};

const reducer = (state: AvatarState = initialState, action: AnyAction) => {
  const typedAction = action as AvatarAction;

  switch (typedAction.type) {
    case getType(updateUsername):
      return {
        ...state,
        username: typedAction.payload.username,
      };
    case getType(fetchUser.success):
      const avatarUrl = typedAction.payload.user.avatar_url;
      return {
        ...state,
        userAvatarUrl: avatarUrl !== undefined ? avatarUrl : null,
      };
    default:
      return state;
  }
};

export default reducer;
