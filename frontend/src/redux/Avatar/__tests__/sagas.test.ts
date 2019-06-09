import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'redux-saga/effects';
import client from 'services/networking/client';
import { getType } from 'typesafe-actions';

import { fetchUser } from '../actions';
import { fetchUserSaga } from '../sagas';

const fetchUserRequestAction = fetchUser.request({ username: 'tcheymol' });

const endpoint = '/users/tcheymol';
const githubUser = { avatar_url: 'https://google.com' };
const outputMock = { body: githubUser };

describe('[Saga] Avatar redux', () => {
  describe('fetchUser', () => {
    describe('when request is a success', () => {
      it('should call the success action when request is a success', async () => {
        return expectSaga(fetchUserSaga, fetchUserRequestAction)
          .provide([[call([client, client.get], endpoint), outputMock]])
          .put(fetchUser.success({ user: githubUser }))
          .run();
      });
    });

    describe('when request fails', () => {
      it('should call the error action', async () => {
        const error = new Error();
        return expectSaga(fetchUserSaga, fetchUserRequestAction)
          .provide([[call([client, client.get], endpoint), throwError(error)]])
          .put(fetchUser.failure({ errorMessage: error.message }))
          .not.put.actionType(getType(fetchUser.success))
          .run();
      });
    });
  });
});
