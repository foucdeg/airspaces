const dgram = require('dgram');

const ip = process.env.TARGET_IP;
const port = process.env.TARGET_PORT || 49003;

let i = 0;
const lonOffset = 4 * Math.random();
const socket = dgram.createSocket('udp4');

function generateCoordinates(index) {
  return {
    longitude: lonOffset + 4 * Math.cos(index / 4000.0),
    latitude: 45 + 2 * Math.sin(index / 4000.0),
    altitude: 20000 * (1 + Math.sin(index / 400.0)),
  };
}

function sendDatagram() {
  i += 1;
  const { longitude, latitude, altitude } = generateCoordinates(i);

  const startBuffer = Buffer.from([68, 65, 84, 65, 60, 20, 0, 0, 0]);
  const endBuffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const latBuffer = Buffer.alloc(4);
  latBuffer.writeFloatLE(latitude);

  const lonBuffer = Buffer.alloc(4);
  lonBuffer.writeFloatLE(longitude);

  const altBuffer = Buffer.alloc(4);
  altBuffer.writeFloatLE(altitude);

  const finalBuffer = Buffer.concat([startBuffer, latBuffer, lonBuffer, altBuffer, endBuffer]);
  socket.send(finalBuffer, port, ip);
}

setInterval(sendDatagram, 50);
