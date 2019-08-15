/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { LocationChangeAction, RouterState } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';

import { reducer as planes } from './Planes';
import { reducer as layers } from './Layers';
import { reducer as activePlane } from './ActivePlane';
import { reducer as notams } from './Notams';
import { RootState } from './types';

/**
 * Example of the Avatar module which should export a reducer.
 */

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers: {
  router: Reducer<RouterState, LocationChangeAction>;
}) {
  return combineReducers<RootState>({
    ...asyncReducers,
    planes,
    activePlane,
    notams,
    layers,
  });
}
