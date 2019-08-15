import { AnyAction } from 'redux';
import * as actions from './actions';
import { Notam } from './types';

export type NotamsState = Notam[];

const initialState: NotamsState = [];

const reducer = (state: NotamsState = initialState, action: AnyAction) => {
  switch (action.type) {
    case actions.FETCH_NOTAMS_RESULT:
      return action.payload.notams;
    case actions.DISMISS_NOTAM:
      document.cookie = `lastSeenNotam=${action.payload.notamId}`;
      return state.filter(notam => notam.id !== action.payload.notamId);
    default:
      return state;
  }
};

export default reducer;
