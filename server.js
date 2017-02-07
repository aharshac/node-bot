const express = require('express');
const compression = require('compression');
const serveStatic = require('serve-static');
const httpLib = require('http');
const socketLib = require('socket.io');
const path = require('path');
const expressLogging = require('express-logging');
const logops = require('logops');

const motors = require('./motors');

const server = {
	app: null,	// Check once if RPi

  port: 5000,

  http: null,

	// Check if Pi
	init: function(onInit) {
    server.app = express();
    server.port = process.env.PORT || 80;

    server.app.set('port', server.port);
    server.app.use(compression());
    server.app.use(expressLogging(logops));
    server.app.use(serveStatic(path.join(__dirname, '/www/index.html')));

    server.http = httpLib.createServer(server.app);

    server.io = socketLib(server.http);
    server.io.sockets.on('connection', server.handleSocketConnection);

    try {
      server.http.listen(server.port, function() {
        onInit(false, server.port);
      });
    } catch (error) {
      onInit(error, null);
    }
	},

  handleSocketConnection: function(socket) {
    socket.on('move', function(direction) {
      switch(direction){
       case 'up':
          motors.goForward();
          break;
        case 'down':
          motors.goReverse();
          break;
        case 'left':
          motors.turnLeft();
          break;
        case 'right':
          motors.turnRight();
          break;
      }
    });
    //listen for stop signal
    socket.on('stop', function(dir){
      motors.stop();
    });
  }
};

module.exports = server;
