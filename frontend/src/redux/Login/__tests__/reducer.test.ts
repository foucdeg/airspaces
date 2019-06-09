import { loginUser, logoutUser } from '../actions';
import reducer from '../reducer';

const token = 'OX1dSSVRFX1BPU1QsQ0FOX1JFQURfTkV';
const initialState = { token: null, loginError: null };

describe('Login reducer', () => {
  describe('USER_LOGIN_SUCCESS case', () => {
    it('Should return an initial state with a token in the token field', () => {
      const action = loginUser.success({
        token,
      });
      const expectedState = { ...initialState, token };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('USER_LOGIN_FAILURE case', () => {
    it('Should return an initial state with an error in the loginError field', () => {
      const errorMessage = 'User not logged in';
      const action = loginUser.failure({ errorMessage });
      const expectedState = { ...initialState, loginError: errorMessage };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});

describe('Logout reducer', () => {
  describe('USER_LOGOUT case', () => {
    it('Should remove all information about the logged in user', () => {
      const action = logoutUser;
      const loggedState = { token, loginError: null };
      const expectedState = initialState;

      expect(reducer(loggedState, action)).toEqual(expectedState);
    });
  });
});
