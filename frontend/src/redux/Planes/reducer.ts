import { AnyAction } from 'redux';
import * as actions from './actions';
import { Aircraft } from './types';
import {
  mergePlaneData,
  togglePlaneTrace,
  clearPlaneTrace,
  renamePlane,
  changePlaneIcon,
} from 'services/helpers';

export type PlanesState = Aircraft[];

const initialState: PlanesState = [];

const reducer = (state: PlanesState = initialState, action: AnyAction) => {
  switch (action.type) {
    case actions.FETCH_PLANES_RESULT:
      return mergePlaneData(state, action.planes);
    case actions.TOGGLE_TRACE:
      return togglePlaneTrace(state, action.key);
    case actions.CLEAR_TRACE:
      return clearPlaneTrace(state, action.key);
    case actions.RENAME_PLANE:
      return renamePlane(state, action.key, action.name);
    case actions.CHANGE_ICON:
      return changePlaneIcon(state, action.key, action.icon);
    default:
      return state;
  }
};

export default reducer;
