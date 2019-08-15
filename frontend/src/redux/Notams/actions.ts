export const FETCH_NOTAMS_REQUEST = 'FETCH_NOTAMS_REQUEST';
export const FETCH_NOTAMS_RESULT = 'FETCH_NOTAMS_RESULT';
export const FETCH_NOTAMS_ERROR = 'FETCH_NOTAMS_ERROR';

export const DISMISS_NOTAM = 'DISMISS_NOTAM';

export function fetchNotams() {
  return { type: FETCH_NOTAMS_REQUEST };
}

export function receiveNotams(notams: string[]) {
  return { type: FETCH_NOTAMS_RESULT, payload: { notams } };
}

export function rejectNotams(error: string) {
  return { type: FETCH_NOTAMS_ERROR, error };
}

export function dismissNotam(notamId: number) {
  return { type: DISMISS_NOTAM, payload: { notamId } };
}

export default {
  fetchNotams,
  receiveNotams,
  rejectNotams,
  dismissNotam,
};
