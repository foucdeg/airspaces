import Leaflet from 'leaflet';
import { default as ICONS, IconName } from '../assets';

export const PERIOD = 1000;
export const INITIAL_ZOOM = 8;

export const POLYLINE_OPTIONS = {
  outlineWidth: 1,
  outlineColor: '#ffffff',
  weight: 3,
  palette: {
    0: '#fdbb2d',
    0.3: '#b21f1f',
    1: '#1a2a6c',
  },
  min: 0,
  max: 50000,
};

export { ICONS };

export const BUILT_ICONS = Object.assign(
  {},
  ...Object.keys(ICONS).map(iconName => ({
    [iconName]: Leaflet.icon({
      iconUrl: ICONS[iconName as IconName],
      iconSize: [30, 30],
    }),
  })),
);
