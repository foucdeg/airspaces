/* eslint no-console: "off" */
const express = require('express');
const mapValues = require('lodash/mapValues');
const pick = require('lodash/pick');
const bodyParser = require('body-parser');
const http = require('http');

const headers = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
  }

  next();
};

const formatPlaneData = planeList => mapValues(
  planeList,
  item => pick(item, ['name', 'altitude', 'longitude', 'latitude', 'speed', 'heading', 'icon']),
);

class MapServer {
  constructor(planeList) {
    this.planeList = planeList;
    this.sockets = {};
    this.app = express();

    this.app.use('/api', bodyParser.json());
    this.app.use('/api', headers);

    this.app.get('/api/data', (req, res) => {
      res.send(JSON.stringify(formatPlaneData(this.planeList)));
    });

    this.app.post('/api/rename', (req, res) => {
      if (!(req.body.name && req.body.ip && this.planeList[req.body.ip])) {
        return res.sendStatus(400);
      }
      this.planeList[req.body.ip].name = req.body.name;
      return res.sendStatus(201);
    });

    this.app.post('/api/change-icon', (req, res) => {
      if (!(req.body.icon && req.body.ip && this.planeList[req.body.ip])) {
        return res.sendStatus(400);
      }
      this.planeList[req.body.ip].icon = req.body.icon;
      return res.sendStatus(201);
    });

    this.listening = false;
  }

  listen(port) {
    this.server = http.createServer(this.app);
    this.server.listen(port, null, null, () => {
      console.log(`Map server now listening on port ${port}`);
    });
  }
}

module.exports = MapServer;
