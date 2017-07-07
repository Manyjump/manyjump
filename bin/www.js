#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../app');
const debug = require('debug')('manyjump:server');
const http = require('http');
const SocketServer = require('ws').Server;
const adjectives = require('./adjectives');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/**
 * Set up WS Server
 */

const wss = new SocketServer({ server });

const users = {};
let curid = 0;
function getRandomName() {
  return 'Princess ' + adjectives[Math.floor(Math.random() * adjectives.length)];
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Add user to users
  const id = curid++;
  const name = getRandomName();
  const user = { id, name }
  users[id] = user;
  ws.send(JSON.stringify({
    event: 'successfullyConnected',
    user: {id: user.id, name: user.name}
  }));
  
  // Broadcast to all clients that new user connected
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({
      event: 'newUserConnected',
      users
    }));
  });
  
  // Remove user from list on disconnect
  ws.on('close', () => {
    console.log(`Client disconnected with id: ${id}`);
    delete users[id];
    
    // Broadcast to all clients that user disconnected
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({
        event: 'userDisconnected',
        users
      }));
    });
  });
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    wss.clients.forEach((client) => {
      client.send(message);
    });
  });
});


//setInterval(() => {
//  wss.clients.forEach((client) => {
//    client.send(new Date().toTimeString());
//  });
//}, 1000);