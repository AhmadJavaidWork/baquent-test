import http from 'http';
import { env, port, ip, apiRoot } from './config';
import express from './services/express';
import api from './api';
import WS from './services/websocket';
import scheduler from './services/scheduler';

const app = express(apiRoot, api);
const server = http.createServer(app);
WS(8080, server);

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log(
      'Express server listening on http://%s:%d, in %s mode',
      ip,
      port,
      env
    );
  });
});

export default app;
