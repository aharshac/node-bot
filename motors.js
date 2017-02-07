const async = require('async');

const rpi = require('./rpi');


const motors = {
  pins: {
    leftForward: 7,
    leftReverse: 11,
    rightForward: 13,
    rightReverse: 15
  },

  goForward: function() {
    async.parallel([
      function(callback) {
        JSON.stringify(rpi, null, 2);
  			rpi.pinHigh(motors.pins.leftForward, callback);
  		},
      function(callback) {
  			rpi.pinHigh(motors.pins.rightForward, callback);
  		}
    ]);
  },

  goForward: function() {
    async.parallel([
      function(callback) {
  			rpi.pinHigh(motors.pins.leftForward, callback);
  		},
      function(callback) {
  			rpi.pinHigh(motors.pins.rightForward, callback);
  		}
    ]);
  },

  goReverse: function() {
    async.parallel([
  		function(callback) {
  			rpi.pinOut(motors.pins.leftReverse, true, callback);
  		},
      function(callback) {
  			rpi.pinOut(motors.pins.rightReverse, true, callback);
  		}
    ]);
  },

  turnLeft: function() {
    async.parallel([
  		function(callback) {
  			rpi.pinOut(motors.pins.leftReverse, true, callback);
  		},
    	function(callback) {
  			rpi.pinOut(motors.pins.rightForward, true, callback);
  		}
  	]);
  },

  turnRight: function() {
    async.parallel([
  		function(callback) {
  			rpi.pinOut(motors.pins.rightReverse, true, callback);
  		},
      function(callback) {
  			rpi.pinOut(motors.pins.leftForward, true, callback);
  		}
    ]);
  },

  stop: function() {
    async.parallel([
  		function(callback) {
  			rpi.pinOut(motors.pins.leftForward, false, callback);
  		},
  		function(callback) {
      	rpi.pinOut(motors.pins.rightForward, false, callback);
  		},
  		function(callback) {
  			rpi.pinOut(motors.pins.rightReverse, false, callback);
  		},
      function(callback) {
  			rpi.pinOut(motors.pins.leftReverse, false, callback);
  		}
    ]);
  }
};


module.exports = motors;
