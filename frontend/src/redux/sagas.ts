import { all } from 'redux-saga/effects';

import { sagas as planesSagas } from 'redux/Planes';
import { sagas as notamsSagas } from 'redux/Notams';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([planesSagas(), notamsSagas()]);
}
