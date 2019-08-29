/* globals document */
import Leaflet from 'leaflet';
import { Position, Aircraft, APIAircraft, APIAircraftSet } from 'redux/Planes/types';
import { PlanesState } from 'redux/Planes/reducer';
import curry from 'lodash/curry';

const DEVIATION_THRESHOLD = 0.1; // square seconds
const FEET_IN_A_METER = 3.28;
const METERS_IN_A_LAT_DEGREE = 111319;
const METERS_IN_A_LON_DEGREE = 78850; // at 45 deg latitude
const METERS_SECONDS_IN_A_KNOT = 0.515;

interface Config {
  initialPositionIfMultiplePlanes?: 'bounds' | 'first';
  staticMode?: false;
}

const BASE_PLANE = {
  isTraceActive: true,
  path: [],
  name: '',
  speed: 0,
  heading: 0,
  position: [0, 0] as [number, number],
  altitude: 0,
  icon: 'airliner',
  identifier: '',
};

/**
 * Returns the square of the distance of B with respect to the line AC, an indication of whether
 * we are in a turn.
 */
function getSquareOffsetDistance(pointA: Position, pointB: Position, pointC: Position) {
  // AB>
  const xAB = (pointB.lng - pointA.lng) * METERS_IN_A_LON_DEGREE;
  const yAB = (pointB.lat - pointA.lat) * METERS_IN_A_LAT_DEGREE;
  const zAB = (pointB.alt - pointA.alt) / FEET_IN_A_METER;
  // AC>
  const xAC = (pointC.lng - pointA.lng) * METERS_IN_A_LON_DEGREE;
  const yAC = (pointC.lat - pointA.lat) * METERS_IN_A_LAT_DEGREE;
  const zAC = (pointC.alt - pointA.alt) / FEET_IN_A_METER;
  // Cross-product
  const xCP = yAB * zAC - zAB * yAC;
  const yCP = zAB * xAC - xAB * zAC;
  const zCP = xAB * yAC - yAB * xAC;

  const squaredCrossProductNorm = xCP * xCP + yCP * yCP + zCP * zCP;
  const squaredAC = xAC * xAC + yAC * yAC + zAC * zAC;

  return squaredAC ? squaredCrossProductNorm / squaredAC : 0;
}

/**
 * This function determines whether the current path point should be kept between its predecessor
 * and the new point. If there is some deviation in direction or climb/descent rate, it should be
 * kept, to provide better path resoution; if not we can skip it.
 */
function shouldKeepCurrentPoint(
  previousPoint: Position,
  currentPoint: Position,
  nextPoint: Position,
  speed: number,
) {
  if (!speed) return true;
  const speedInMetersSecond = speed * METERS_SECONDS_IN_A_KNOT;
  const squareOffsetDistance = getSquareOffsetDistance(previousPoint, currentPoint, nextPoint);

  const squaredOffsetTime = squareOffsetDistance / speedInMetersSecond;

  return squaredOffsetTime > DEVIATION_THRESHOLD;
}

function makeNewPlane(oldPlane: Aircraft, newData: APIAircraft, identifier?: string) {
  const { name, longitude, latitude, altitude, speed, heading, icon } = newData;

  const newPlane: Aircraft = {
    ...oldPlane,
    icon,
    path: [...oldPlane.path],
    name,
    altitude,
    speed,
    heading,
    position: [latitude, longitude],
  };

  const newPathPoint = {
    lat: latitude,
    lng: longitude,
    alt: altitude,
    heading,
    timestamp: Date.now(),
  };

  if (
    newPlane.path.length < 2 ||
    shouldKeepCurrentPoint(
      newPlane.path[newPlane.path.length - 2],
      newPlane.path[newPlane.path.length - 1],
      newPathPoint,
      speed,
    )
  ) {
    newPlane.path.push(newPathPoint);
  } else {
    newPlane.path[newPlane.path.length - 1] = newPathPoint;
  }

  if (!newPlane.identifier && identifier) newPlane.identifier = identifier;

  return newPlane;
}

export function mergePlaneData(oldState: PlanesState, newPlanesData: APIAircraftSet) {
  const newState: Aircraft[] = [];

  // update all pre-existing planes with their current data
  oldState.forEach(oldPlane => {
    if (!(oldPlane.identifier in newPlanesData)) return;
    newState.push(makeNewPlane(oldPlane, newPlanesData[oldPlane.identifier]));
  });

  // add new planes
  Object.keys(newPlanesData).forEach(identifier => {
    const oldPlaneIndex = oldState.findIndex(_plane => _plane.identifier === identifier);
    if (oldPlaneIndex === -1) {
      const newPlane = makeNewPlane(BASE_PLANE, newPlanesData[identifier], identifier);
      newState.push(newPlane);
    }
  });

  return newState;
}

export function applyChangeToPlane(
  changeFunction: (plane: Aircraft) => Aircraft,
  identifier: string,
  oldState: Aircraft[],
): Aircraft[] {
  return oldState.map(aircraft => {
    if (aircraft.identifier !== identifier) {
      return aircraft;
    }
    return changeFunction(aircraft);
  });
}

const curriedApplyChangeToPlane = curry(applyChangeToPlane);

export const togglePlaneTrace: (
  identifier: string,
  oldState: Aircraft[],
) => Aircraft[] = curriedApplyChangeToPlane(aircraft => ({
  ...aircraft,
  isTraceActive: !aircraft.isTraceActive,
}));

export const clearPlaneTrace: (
  identifier: string,
  oldState: Aircraft[],
) => Aircraft[] = curriedApplyChangeToPlane(aircraft => ({
  ...aircraft,
  path: [],
}));

export const renamePlane = (
  oldState: PlanesState,
  identifier: string,
  name: string,
): Aircraft[] => {
  return curriedApplyChangeToPlane(aircraft => ({
    ...aircraft,
    name,
  }))(identifier, oldState);
};

export function changePlaneIcon(
  oldState: PlanesState,
  identifier: string,
  icon: string,
): Aircraft[] {
  return curriedApplyChangeToPlane(aircraft => ({
    ...aircraft,
    icon,
  }))(identifier, oldState);
}

export function formatLatLon([latitude, longitude]: [number, number]) {
  const northOrSouth = latitude > 0 ? 'N' : 'S';
  const eastOrWest = latitude > 0 ? 'E' : 'W';
  const latitudeText = Math.abs(latitude).toLocaleString('en-us', { maximumFractionDigits: 4 });
  const longitudeText = Math.abs(longitude).toLocaleString('en-us', { maximumFractionDigits: 4 });

  return `${latitudeText} ${northOrSouth}, ${longitudeText} ${eastOrWest}`;
}

export function decodeConfig() {
  const config: Config = document.location.search
    .substring(1)
    .split('&')
    .map(decodeURIComponent)
    .reduce((accumulator, fragment) => {
      const [key, value] = fragment.split('=');

      return {
        ...accumulator,
        [key]: value || true,
      };
    }, {});

  return config;
}

type LatOrLon = 'lat' | 'lon';

const minimumReducer = (latOrLon: LatOrLon) => (accumulator: number, currentItem: Aircraft) =>
  currentItem.position[latOrLon === 'lat' ? 0 : 1] < accumulator
    ? currentItem.position[latOrLon === 'lat' ? 0 : 1]
    : accumulator;

const maximumReducer = (latOrLon: LatOrLon) => (accumulator: number, currentItem: Aircraft) =>
  currentItem.position[latOrLon === 'lat' ? 0 : 1] > accumulator
    ? currentItem.position[latOrLon === 'lat' ? 0 : 1]
    : accumulator;

export function getPlanesBounds(planes: PlanesState): Leaflet.LatLngBounds {
  const maxLat = planes.reduce(maximumReducer('lat'), -90);
  const minLat = planes.reduce(minimumReducer('lat'), 90);
  const maxLng = planes.reduce(maximumReducer('lon'), -180);
  const minLng = planes.reduce(minimumReducer('lon'), 180);
  const southWest = new Leaflet.LatLng(minLat, minLng);
  const northEast = new Leaflet.LatLng(maxLat, maxLng);
  return new Leaflet.LatLngBounds(southWest, northEast);
}

/* eslint-disable no-bitwise */
export function hashObject(object: object) {
  let hash = 0;
  const strObject = JSON.stringify(object);
  for (let i = 0; i < strObject.length; i++) {
    const character = strObject.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash &= hash; // Convert to 32bit integer
  }
  return hash;
}
/* eslint-enable no-bitwise */
