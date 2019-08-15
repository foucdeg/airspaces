/* eslint no-console: "off", no-mixed-operators: "off" */
import dgram from 'dgram';
import geolib from 'geolib';
import last from 'lodash/last';
import { PlaneList, PlaneData } from 'src/main';

const HISTORY_DURATION = 5000;

const emptyPlaneData: PlaneData = ({
  longitude: null,
  latitude: null,
  altitude: null,
  date: null,
  transponder: null,
} as unknown) as PlaneData;

class UDPListener {
  static readMessage(message: Buffer): PlaneData | null {
    // See http://www.nuclearprojects.com/xplane/xplaneref.html
    let data: PlaneData | null = null;
    let i = 5;
    while (i + 36 <= message.length) {
      if (message.readInt8(i) === 20) {
        if (!data) data = { ...emptyPlaneData };
        data = {
          ...data,
          latitude: message.readFloatLE(i + 4),
          longitude: message.readFloatLE(i + 8),
          altitude: message.readFloatLE(i + 12),
          date: Date.now(),
        };
      }
      if (message.readInt8(i) === 104) {
        if (!data) data = { ...emptyPlaneData };
        data = {
          ...data,
          transponder: message.readFloatLE(i + 8),
        };
      }
      i += 36;
    }
    return data;
  }

  static calculateSpeed(from: PlaneData, to: PlaneData) {
    if (!from || !to) return 0;
    const distanceInMeters = geolib.getDistance(from, to) || 0;
    const deltaTInMilliseconds = to.date - from.date;
    const speedInMS = (1000 * distanceInMeters) / deltaTInMilliseconds;
    return (speedInMS * 3600) / 1852;
  }

  static calculateBearing(from: PlaneData, to: PlaneData) {
    if (!from) return 0;
    if (from.longitude === to.longitude && from.latitude === to.latitude) {
      throw new Error('No bearing');
    }
    return geolib.getRhumbLineBearing(from, to);
  }

  planeList: PlaneList;
  server: dgram.Socket | null = null;
  listening: boolean = false;

  constructor(planeList: PlaneList) {
    this.planeList = planeList;
    this.server = dgram.createSocket('udp4');

    this.server.on('error', err => {
      console.error(`UPD error:\n${err.stack}`);
      this.server && this.server.close();
    });

    this.server.on('message', (msg, rinfo) => {
      const data = UDPListener.readMessage(msg);
      if (!data || !data.transponder) return;
      const identifier = `${data.transponder} (${rinfo.address})`;
      this.updatePosition(identifier, data);
    });

    this.listening = false;

    setInterval(this.cleanOutdatedPlanes.bind(this), 1000);
  }

  updatePosition(identifier: string, newLocation: PlaneData) {
    if (!newLocation) return;
    const oldPlaneInfo = this.planeList[identifier];
    const newPlaneInfo = {
      ...oldPlaneInfo,
      ...newLocation,
    };

    if (!newPlaneInfo.positionHistory) newPlaneInfo.positionHistory = [];
    if (!newPlaneInfo.name) newPlaneInfo.name = identifier;
    if (!newPlaneInfo.icon) newPlaneInfo.icon = 'airliner';
    if (!newPlaneInfo.heading) newPlaneInfo.heading = 0;
    if (!newPlaneInfo.speed) newPlaneInfo.speed = 0;

    newPlaneInfo.positionHistory.unshift(newLocation);
    const now = Date.now();
    let lastPosition: PlaneData | undefined;
    while (
      (lastPosition = last(newPlaneInfo.positionHistory)) &&
      lastPosition &&
      lastPosition.date < now - HISTORY_DURATION
    ) {
      newPlaneInfo.positionHistory.pop();
    }

    const from = newPlaneInfo.positionHistory[newPlaneInfo.positionHistory.length - 1];
    const to = newPlaneInfo.positionHistory[0];

    try {
      newPlaneInfo.heading = UDPListener.calculateBearing(from, to);
    } catch (e) {
      // keep previous heading
    }

    newPlaneInfo.speed = UDPListener.calculateSpeed(from, to);

    this.planeList[identifier] = newPlaneInfo;
  }

  listen(port: number) {
    this.server &&
      this.server.bind(port, undefined, () => {
        this.listening = true;
        console.log(`UDP client now listening on port ${port}`);
      });
  }

  cleanOutdatedPlanes() {
    Object.keys(this.planeList).forEach(identifier => {
      const latestPositionDate = this.planeList[identifier].positionHistory[0].date;
      // if latest known position is older than 60s
      if (Date.now() - latestPositionDate > 60000) {
        // assume they crashed and call 911
        delete this.planeList[identifier];
      }
    });
  }
}

export default UDPListener;
