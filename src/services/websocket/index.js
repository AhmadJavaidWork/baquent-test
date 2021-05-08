import WebSocket from 'ws';
import queries from '../../api/service/queries';
import { makeRes } from '../../api/service/herlper';

export default (port, httpServer) => {
  const wss = new WebSocket.Server({
    port,
    httpServer,
  });
  wss.on('connection', (ws) => {
    ws.send(
      'Connect please let us know your query for example\n{ "fsyms": "BTC,LTC", "tsyms": "USD,EUR" }'
    );
    ws.on('message', (data) => {
      const query = JSON.parse(data);
      wss.clients.forEach(async (client) => {
        if (client.readyState === WebSocket.OPEN) {
          const { raws, displays } = await queries.getDataFromDB(query);
          const resObject = makeRes(raws, displays, query);
          client.send(JSON.stringify(resObject));
        }
      });
    });
  });
};
