const dgram = require('dgram');

const ip = process.env.TARGET_IP;
const port = process.env.TARGET_PORT || 49003;
const INTERVAL = process.env.INTERVAL || 100;
const SPEED = process.env.SPEED || 1;

const socket = dgram.createSocket('udp4');

const data = require('./traces/flight-playback.json');
const trace = data.result.response.data.flight.track;

let index = process.env.START_INDEX ? parseInt(process.env.START_INDEX) : 0;
const startTimestamp = Date.now();
const initialTrackTimestamp = trace[index].timestamp;

const emit = (latitude, longitude, altitude) => {
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


const sendNextPosition = () => {
  const lastPosition = trace[index];
  const targetTimestamp = initialTrackTimestamp * 1000 + SPEED * (Date.now() - startTimestamp);
  const nextPositionIndex = trace.slice(index).findIndex(position => (position.timestamp * 1000) > targetTimestamp);
  if (nextPositionIndex === -1) {
    process.exit(0);
  }
  const nextPosition = trace[index + nextPositionIndex];

  const elapsedTimeProportion = (targetTimestamp - lastPosition.timestamp * 1000) / (nextPosition.timestamp * 1000 - lastPosition.timestamp * 1000);
  const targetLat = lastPosition.latitude + elapsedTimeProportion * (nextPosition.latitude - lastPosition.latitude);
  const targetLon = lastPosition.longitude + elapsedTimeProportion * (nextPosition.longitude - lastPosition.longitude);
  const targetAlt = lastPosition.altitude.feet + elapsedTimeProportion * (nextPosition.altitude.feet - lastPosition.altitude.feet);

  emit(targetLat, targetLon, targetAlt);
  if ((nextPosition.timestamp * 1000 - targetTimestamp) < INTERVAL) {
    console.info(`Passed position ${index + nextPositionIndex}`);
    index = index + nextPositionIndex;
  }
};

setInterval(sendNextPosition, INTERVAL);
