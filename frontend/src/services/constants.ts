import Leaflet from 'leaflet';

export const PERIOD = 1000;
export const INITIAL_ZOOM = 8;

const defaultAvailableIcons = ['Airliner.svg', 'Civil.svg', 'Fighter.svg', 'Helicopter.svg'];

const availableIconsEnvVar = process.env.REACT_APP_AVAILABLE_ICONS;
export const ICON_NAMES = availableIconsEnvVar
  ? availableIconsEnvVar.split(',')
  : defaultAvailableIcons;

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

export const LEAFLET_ICONS = Object.assign(
  {},
  ...ICON_NAMES.map(iconName => ({
    [iconName]: Leaflet.icon({
      iconUrl: `/icons/${iconName}`,
      iconSize: [30, 30],
    }),
  })),
);
