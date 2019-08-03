import { call, put, takeEvery } from 'redux-saga/effects';

import client from 'services/networking/client';
import { rejectPlanes, receivePlanes, FETCH_PLANES_REQUEST } from './actions';

// worker Saga: will be fired on USER_FETCH_REQUEST actions
export function* fetchPlanesSaga() {
  const endpoint = `/data`;
  try {
    const response = yield call([client, client.get], endpoint);
    yield put(receivePlanes(response));
  } catch (error) {
    yield put(rejectPlanes(error.message));
  }
}

/*
  Behavior similar to redux-thunk
  Starts fetchUser on each dispatched `USER_FETCH_REQUEST` action.
  Allows concurrent fetches of user.
*/
export default function* planesSagas() {
  yield takeEvery(FETCH_PLANES_REQUEST, fetchPlanesSaga);
}
