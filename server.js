const express = require('express');
const compression = require('compression');
const serveStatic = require('serve-static');
const basicAuth = require('express-basic-auth');
const httpLib = require('http');
const socketLib = require('socket.io');
const path = require('path');

const controller = require('./controller');

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
		server.app.use(basicAuth({
		  users: { 'user': 'collaborizm' },
		  challenge: true,
		  unauthorizedResponse: function(req) {
		    return req.auth ? 'Wrong username or password.'  : 'No credentials provided';
		  }
		}));
		server.app.use(serveStatic('www'));

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
		/* move signals */
    socket.on('move', function(direction) {
      switch(direction){
       	case 'forward':
          controller.moveForward();
          break;
        case 'reverse':
          controller.moveReverse();
          break;
        case 'left':
          controller.moveLeft();
          break;
        case 'right':
          controller.moveRight();
          break;
      }
    });

    socket.on('camera', function(direction) {
			switch(direction) {
	      case 'left':
					controller.servoPanLeft();
	        break;
				case 'right':
					controller.servoPanRight();
	        break;
				case 'center':
					controller.servosCenter();
	        break;
	      case 'up':

	        break;
	      case 'down':

	        break;
	    }
    });

		socket.on('aux', function(what) {
      switch(what){
       	case 'light':
          controller.changeHeadLightState(function(headLightOn) {
						var data = {
							id: 'light',
							value: headLightOn
						};
						socket.emit('aux', data);
					});
          break;
      }
    });

		/* stop signals */
    socket.on('stop', function(what) {
			switch(what) {
       	case 'motors':
          controller.stopMotors();
          break;
       	case 'servos':
          controller.stopServos();
          break;
				default:
					controller.stopMotors();
					controller.stopServos();
      }
    });
  }
};

module.exports = server;
