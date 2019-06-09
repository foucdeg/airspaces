import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { put, takeEvery } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';

import client from 'services/networking/client';

import { loginUser } from '../actions';
import { loginUserSaga } from '../sagas';

const loginUserRequestAction = loginUser.request({
  email: 'bilbo@culdesac.gnd',
  password: 'm0ñPr3cieuX',
});
const token = 'OX1dSSVRFX1BPU1QsQ0FOX1JFQURfTkV';

describe('[Saga] Login redux', () => {
  describe('loginUser', () => {
    describe('when request is a success', () => {
      it('should call the success action when request is a success', async () => {
        return expectSaga(loginUserSaga, loginUserRequestAction)
          .provide([[matchers.call.fn(client.login), token]])
          .put(loginUser.success({ token }))
          .run();
      });
    });

    describe('when request fails', () => {
      it('should call the error action', async () => {
        const error = new Error();
        return expectSaga(loginUserSaga, loginUserRequestAction)
          .provide([[matchers.call.fn(client.login), throwError(error)]])
          .put(loginUser.failure({ errorMessage: error.message }))
          .not.put.actionType(getType(loginUser.success))
          .run();
      });
    });
  });
});
