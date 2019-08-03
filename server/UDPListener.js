/* eslint no-console: "off", no-mixed-operators: "off" */
const dgram = require('dgram');
const geolib = require('geolib');
const last = require('lodash/last');

const HISTORY_DURATION = 5000;

class UDPListener {
  static readMessage(message) {
    // See http://www.nuclearprojects.com/xplane/xplaneref.html
    let data = {};
    let i = 5;
    while (i + 36 <= message.length) {
      if (message.readInt8(i) === 20) {
        data = {
          ...data,
          latitude: message.readFloatLE(i + 4),
          longitude: message.readFloatLE(i + 8),
          altitude: message.readFloatLE(i + 12),
          date: Date.now(),
        };
      }
      if (message.readInt8(i) === 104) {
        data = {
          ...data,
          transponder: message.readFloatLE(i + 8),
        };
      }
      i += 36;
    }
    return data;
  }

  static calculateSpeed(from, to) {
    if (!from || !to) return 0;
    const distanceInMeters = geolib.getDistance(from, to, 1) || 0;
    const deltaTInMilliseconds = to.date - from.date;
    const speedInMS = 1000 * distanceInMeters / deltaTInMilliseconds;
    return speedInMS * 3600 / 1852;
  }

  static calculateBearing(from, to) {
    if (!from) return 0;
    if (from.longitude === to.longitude && from.latitude === to.latitude) {
      throw new Error('No bearing');
    }
    return geolib.getRhumbLineBearing(from, to);
  }

  constructor(planeList) {
    this.planeList = planeList;
    this.server = dgram.createSocket('udp4');

    this.server.on('error', (err) => {
      console.error(`UPD error:\n${err.stack}`);
      this.server.close();
    });

    this.server.on('message', (msg, rinfo) => {
      const data = UDPListener.readMessage(msg);
      const identifier = `XPNDR ${data.transponder} (${rinfo.address})`;
      this.updatePosition(identifier, data);
    });

    this.listening = false;

    setInterval(this.cleanOutdatedPlanes.bind(this), 1000);
  }

  updatePosition(identifier, newLocation) {
    if (!newLocation) return;
    const planeInfo = this.planeList[identifier] || {};
    Object.assign(planeInfo, newLocation);

    if (!planeInfo.positionHistory) planeInfo.positionHistory = [];
    if (!planeInfo.name) planeInfo.name = identifier;
    if (!planeInfo.icon) planeInfo.icon = 'airliner';
    if (!planeInfo.heading) planeInfo.heading = 0;
    if (!planeInfo.speed) planeInfo.speed = 0;

    planeInfo.positionHistory.unshift(newLocation);
    const now = Date.now();
    while (last(planeInfo.positionHistory).date < (now - HISTORY_DURATION)) {
      planeInfo.positionHistory.pop();
    }

    const from = planeInfo.positionHistory[planeInfo.positionHistory.length - 1];
    const to = planeInfo.positionHistory[0];

    try {
      planeInfo.heading = UDPListener.calculateBearing(from, to);
    } catch (e) {
      // keep previous heading
    }

    planeInfo.speed = UDPListener.calculateSpeed(from, to);

    this.planeList[identifier] = planeInfo;
  }

  listen(port) {
    this.server.bind(port, null, () => {
      this.listening = true;
      console.log(`UDP client now listening on port ${port}`);
    });
  }

  cleanOutdatedPlanes() {
    Object.keys(this.planeList).forEach((identifier) => {
      const latestPositionDate = this.planeList[identifier].positionHistory[0].date;
      // if latest known position is older than 60s
      if ((Date.now() - latestPositionDate) > 60000) {
        // assume they crashed and call 911
        delete this.planeList[identifier];
      }
    });
  }
}

module.exports = UDPListener;
