import { AnyAction } from 'redux';
import { SET_ACTIVE_PLANE } from './actions';
import { FETCH_PLANES_RESULT } from 'redux/Planes/actions';
export type ActivePlaneState = string | null | boolean;

const initialState: ActivePlaneState = null;

const reducer = (state: ActivePlaneState = initialState, action: AnyAction): ActivePlaneState => {
  switch (action.type) {
    case SET_ACTIVE_PLANE:
      return action.key;
    case FETCH_PLANES_RESULT:
      if (Object.keys(action.planes).length === 1 && state === null) {
        return Object.keys(action.planes)[0];
      }
      return state || false;
    default:
      return state;
  }
};

export default reducer;
