export const ADD_LAYER = 'ADD_LAYER';
export const REMOVE_LAYER = 'REMOVE_LAYER';

export function addLayer(name: string, geoJson: GeoJSON.FeatureCollection) {
  return { type: ADD_LAYER, payload: { name, geoJson } };
}

export function removeLayer(idToRemove: string) {
  return { type: REMOVE_LAYER, payload: { idToRemove } };
}

export default {
  addLayer,
  removeLayer,
};
