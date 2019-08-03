import { Aircraft } from 'redux/Planes/types';

export const SET_ACTIVE_PLANE = 'SET_ACTIVE_PLANE';

export function setActivePlane(plane: Aircraft | null | false) {
  return { type: SET_ACTIVE_PLANE, key: plane ? plane.identifier : plane };
}

export default {
  setActivePlane,
};
