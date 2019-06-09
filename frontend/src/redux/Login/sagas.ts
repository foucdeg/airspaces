import { call, put, takeEvery } from 'redux-saga/effects';
import client from 'services/networking/client';
import { ActionType, getType } from 'typesafe-actions';
import { loginUser } from './actions';

export function* loginUserSaga(action: ActionType<typeof loginUser.request>) {
  try {
    const token: string | undefined = yield call([client, client.login], action.payload);
    if (token) {
      yield put(loginUser.success({ token }));
    } else {
      yield put(loginUser.failure({ errorMessage: 'No token in login response body' }));
    }
  } catch (error) {
    yield put(loginUser.failure({ errorMessage: error.message }));
  }
}

export default function* loginSagas() {
  yield takeEvery(getType(loginUser.request), loginUserSaga);
}
