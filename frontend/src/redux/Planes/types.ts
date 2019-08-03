import { IconName } from 'src/assets';

export interface Position {
  lat: number;
  lng: number;
  alt: number;
  heading: number;
  timestamp: number;
}

export interface Aircraft {
  name: string;
  position: [number, number];
  altitude: number;
  icon: IconName;
  speed: number;
  heading: number;
  isTraceActive: boolean;
  path: Position[];
  identifier: string;
}

export interface APIAircraft {
  name: string;
  longitude: number;
  latitude: number;
  altitude: number;
  speed: number;
  heading: number;
  icon: IconName;
}
export type APIAircraftSet = {
  [identifier: string]: APIAircraft;
};
