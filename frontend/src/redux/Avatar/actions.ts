import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import { User } from './types';

export const updateUsername = createStandardAction('Avatar/UPDATE_USERNAME')<{
  username: string;
}>();

export const fetchUser = createAsyncAction(
  'Avatar/USER_FETCH_REQUEST',
  'Avatar/USER_FETCH_SUCCESS',
  'Avatar/USER_FETCH_FAILURE',
)<
  {
    username: string;
  },
  {
    user: User;
  },
  {
    errorMessage: string;
  }
>();

export default {
  updateUsername,
  fetchUser,
};
