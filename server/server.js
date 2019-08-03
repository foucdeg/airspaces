const MapServer = require('./MapServer');
const UDPListener = require('./UDPListener');

const mapServerPort = process.env.MAP_SERVER_PORT || 8080;
const xPlanePort = process.env.X_PLANE_PORT || 49003;

const planesList = {};

const mapServer = new MapServer(planesList);
mapServer.listen(mapServerPort);

const udpClient = new UDPListener(planesList);
udpClient.listen(xPlanePort);
