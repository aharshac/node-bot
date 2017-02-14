const async = require('async');

const rpi = require('./rpi');


const controller = {
  motorsTimeoutId: 0,

  headLightTimeoutId: 0,

  headLightOn: false,

  startMotorsTimer: function() {
    controller.stopMotorsTimer();
    controller.motorsTimeoutId = setTimeout(function() {
      controller.stopMotors();
    }, 5000);
  },

  stopMotorsTimer: function() {
    clearTimeout(controller.motorsTimeoutId);
  },

  startHeadLightTimer: function(callback) {
    controller.stopHeadLightTimer();
    controller.headLightTimeoutId = setTimeout(function() {
      controller.headLightOn = false;
      rpi.pinOut(rpi.pins.headLight, controller.headLightOn, callback);
      controller.stopHeadLightTimer();
      if (callback) callback(controller.headLightOn);
    }, 60000);
  },

  stopHeadLightTimer: function() {
    clearTimeout(controller.headLightTimeoutId);
  },

  moveForward: function() {
    async.parallel([
      function(callback) {
  			rpi.pinHigh(rpi.pins.leftForward, callback);
  		},
      function(callback) {
  			rpi.pinHigh(rpi.pins.rightForward, callback);
  		}
    ], function(err, results) {
      controller.startMotorsTimer();
    });
  },

  moveReverse: function() {
    async.parallel([
  		function(callback) {
  			rpi.pinHigh(rpi.pins.leftReverse, callback);
  		},
      function(callback) {
  			rpi.pinHigh(rpi.pins.rightReverse, callback);
  		}
    ], function(err, results) {
      controller.startMotorsTimer();
    });
  },

  moveLeft: function() {
    async.parallel([
  		function(callback) {
  			rpi.pinHigh(rpi.pins.leftReverse, callback);
  		},
    	function(callback) {
  			rpi.pinHigh(rpi.pins.rightForward, callback);
  		}
  	], function(err, results) {
      controller.startMotorsTimer();
    });
  },

  moveRight: function() {
    async.parallel([
  		function(callback) {
  			rpi.pinHigh(rpi.pins.rightReverse, callback);
  		},
      function(callback) {
  			rpi.pinHigh(rpi.pins.leftForward, callback);
  		}
    ], function(err, results) {
      controller.startMotorsTimer();
    });
  },

  stopMotors: function() {
    controller.stopMotorsTimer();
    async.parallel([
  		function(callback) {
  			rpi.pinLow(rpi.pins.leftForward, callback);
  		},
  		function(callback) {
      	rpi.pinLow(rpi.pins.rightForward, callback);
  		},
  		function(callback) {
  			rpi.pinLow(rpi.pins.rightReverse, callback);
  		},
      function(callback) {
  			rpi.pinLow(rpi.pins.leftReverse, callback);
  		}
    ]);
  },

  changeHeadLightState: function(callback) {
    controller.headLightOn = !controller.headLightOn();
    controller.startHeadLightTimer(callback);
    rpi.pinOut(rpi.pins.headLight, controller.headLightOn, callback);
    if (callback) callback(controller.headLightOn);
  }
};

module.exports = controller;
