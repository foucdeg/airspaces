import { AnyAction } from 'redux';
import * as actions from './actions';
import { KMLLayer } from './types';

import { hashObject } from 'services/helpers';

export type LayersState = KMLLayer[];

const initialState: LayersState = [];

const reducer = (state: LayersState = initialState, action: AnyAction) => {
  switch (action.type) {
    case actions.ADD_LAYER:
      return [...state, { ...action.payload, id: hashObject(action.payload) }];
    case actions.REMOVE_LAYER:
      return state.filter(layer => layer.id !== action.payload.idToRemove);
    default:
      return state;
  }
};

export default reducer;
