import { ICON_NAMES } from 'services/constants';
import { Aircraft, APIAircraftSet } from './types';

export const FETCH_PLANES_REQUEST = 'FETCH_PLANES_REQUEST';
export const FETCH_PLANES_RESULT = 'FETCH_PLANES_RESULT';
export const FETCH_PLANES_ERROR = 'FETCH_PLANES_ERROR';

export const RENAME_PLANE = 'RENAME_PLANE';
export const REMOVE_PLANE = 'REMOVE_PLANE';
export const TOGGLE_TRACE = 'TOGGLE_TRACE';
export const CLEAR_TRACE = 'CLEAR_TRACE';
export const CHANGE_ICON = 'CHANGE_ICON';

const endpoint = '';

export function renamePlane(plane: Aircraft, name: string) {
  fetch(`${endpoint}/api/rename`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: plane.identifier,
      name,
    }),
  });
  return { type: RENAME_PLANE, key: plane.identifier, name };
}

export function removePlane(plane: Aircraft) {
  return { type: REMOVE_PLANE, key: plane.identifier };
}

export function toggleTrace(plane: Aircraft) {
  return { type: TOGGLE_TRACE, key: plane.identifier };
}

export function clearTrace(plane: Aircraft) {
  return { type: CLEAR_TRACE, key: plane.identifier };
}

function nextIcon(currentIcon: string) {
  const currentIndex = ICON_NAMES.indexOf(currentIcon);
  return ICON_NAMES[(currentIndex + 1) % ICON_NAMES.length];
}

export function changeIcon(plane: Aircraft) {
  const icon = nextIcon(plane.icon);
  fetch(`${endpoint}/api/change-icon`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: plane.identifier,
      icon,
    }),
  });
  return { type: CHANGE_ICON, key: plane.identifier, icon };
}

export function receivePlanes(planes: APIAircraftSet) {
  return { type: FETCH_PLANES_RESULT, planes };
}

export function rejectPlanes(error: string) {
  return { type: FETCH_PLANES_ERROR, error };
}

export function fetchPlanes() {
  return { type: FETCH_PLANES_REQUEST };
}

export default {
  renamePlane,
  removePlane,
  toggleTrace,
  clearTrace,
  changeIcon,
  receivePlanes,
  rejectPlanes,
  fetchPlanes,
};
