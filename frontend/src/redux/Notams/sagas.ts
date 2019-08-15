import { call, put, takeEvery } from 'redux-saga/effects';

import client from 'services/networking/client';
import { rejectNotams, receiveNotams, FETCH_NOTAMS_REQUEST } from './actions';

// worker Saga: will be fired on USER_FETCH_REQUEST actions
export function* fetchNotamsSaga() {
  const endpoint = `/notams`;
  try {
    const response = yield call([client, client.get], endpoint);
    console.log(response);
    yield put(receiveNotams(response));
  } catch (error) {
    console.error(error);
    yield put(rejectNotams(error.message));
  }
}

/*
  Behavior similar to redux-thunk
  Starts fetchUser on each dispatched `USER_FETCH_REQUEST` action.
  Allows concurrent fetches of user.
*/
export default function* planesSagas() {
  yield takeEvery(FETCH_NOTAMS_REQUEST, fetchNotamsSaga);
}
