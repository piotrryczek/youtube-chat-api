import io from 'socket.io';
import http from 'http';

import 'config/env';
import ioServerService from 'services/ioServer';

import app from './app';

const server = http.createServer(app.callback());
const ioServer = io(server);

ioServerService.setServer(ioServer);
ioServerService.init();

server.listen(8000);
