import MapServer from './MapServer';
import UDPListener from './UDPListener';

const mapServerPort = process.env.MAP_SERVER_PORT ? parseInt(process.env.MAP_SERVER_PORT) : 9000;
const xPlanePort = process.env.X_PLANE_PORT ? parseInt(process.env.X_PLANE_PORT) : 49003;

export interface PlaneList {
  [identifier: string]: FullPlaneData;
}

export interface PlaneData {
  latitude: number;
  longitude: number;
  altitude: number;
  date: number;
  transponder: number | null;
}

export type FullPlaneData = PlaneData & {
  name: string;
  positionHistory: PlaneData[];
  icon: string;
  heading: number;
  speed: number;
};

const planesList: PlaneList = {};

const mapServer = new MapServer(planesList);
mapServer.listen(mapServerPort);

const udpClient = new UDPListener(planesList);
udpClient.listen(xPlanePort);
