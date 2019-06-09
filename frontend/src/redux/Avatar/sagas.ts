import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionType, getType } from 'typesafe-actions';

import client from 'services/networking/client';
import { fetchUser } from './actions';

// worker Saga: will be fired on USER_FETCH_REQUEST actions
export function* fetchUserSaga(action: ActionType<typeof fetchUser.request>) {
  const endpoint = `/users/${action.payload.username}`;
  try {
    const response = yield call([client, client.get], endpoint);
    yield put(fetchUser.success({ user: response.body }));
  } catch (error) {
    yield put(fetchUser.failure({ errorMessage: error.message }));
  }
}

/*
  Behavior similar to redux-thunk
  Starts fetchUser on each dispatched `USER_FETCH_REQUEST` action.
  Allows concurrent fetches of user.
*/
export default function* avatarSagas() {
  yield takeEvery(getType(fetchUser.request), fetchUserSaga);
}
