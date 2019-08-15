/* eslint no-console: "off" */
import express from 'express';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import { PlaneList } from 'main';
import notams from './notams';

const headers = (req: express.Request, res: express.Response, next: () => void) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
  }

  next();
};

const formatPlaneData = (planeList: PlaneList) =>
  mapValues(planeList, item =>
    pick(item, ['name', 'altitude', 'longitude', 'latitude', 'speed', 'heading', 'icon']),
  );

class MapServer {
  planeList: PlaneList;
  app: express.Application;
  server: http.Server | null = null;

  constructor(planeList: PlaneList) {
    this.planeList = planeList;
    this.app = express();

    this.app.use('/api', bodyParser.json());
    this.app.use('/api', cookieParser());
    this.app.use('/api', headers);

    this.app.get('/api/data', (req, res) => {
      res.send(JSON.stringify(formatPlaneData(this.planeList)));
    });

    this.app.get('/api/notams', (req, res) => {
      const lastSeenNotam = parseInt(req.cookies.lastSeenNotam) || 0;
      const newNotams = notams
        .map((message, index) => ({ message, id: index + 1 }))
        .slice(lastSeenNotam);

      return res.send(JSON.stringify(newNotams)).end();
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
  }

  listen(port: number) {
    this.server = http.createServer(this.app);
    this.server.listen(port, undefined, undefined, () => {
      console.log(`Map server now listening on port ${port}`);
    });
  }
}

export default MapServer;
