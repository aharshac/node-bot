const async = require('async');

const rpi = require('./rpi');


const motors = {
  goForward: function() {
    async.parallel([
      function(callback) {
  			rpi.pinHigh(rpi.pins.leftForward, callback);
  		},
      function(callback) {
  			rpi.pinHigh(rpi.pins.rightForward, callback);
  		}
    ]);
  },

  goReverse: function() {
    async.parallel([
  		function(callback) {
  			rpi.pinOut(rpi.pins.leftReverse, true, callback);
  		},
      function(callback) {
  			rpi.pinOut(rpi.pins.rightReverse, true, callback);
  		}
    ]);
  },

  turnLeft: function() {
    async.parallel([
  		function(callback) {
  			rpi.pinOut(rpi.pins.leftReverse, true, callback);
  		},
    	function(callback) {
  			rpi.pinOut(rpi.pins.rightForward, true, callback);
  		}
  	]);
  },

  turnRight: function() {
    async.parallel([
  		function(callback) {
  			rpi.pinOut(rpi.pins.rightReverse, true, callback);
  		},
      function(callback) {
  			rpi.pinOut(rpi.pins.leftForward, true, callback);
  		}
    ]);
  },

  stop: function() {
    async.parallel([
  		function(callback) {
  			rpi.pinOut(rpi.pins.leftForward, false, callback);
  		},
  		function(callback) {
      	rpi.pinOut(rpi.pins.rightForward, false, callback);
  		},
  		function(callback) {
  			rpi.pinOut(rpi.pins.rightReverse, false, callback);
  		},
      function(callback) {
  			rpi.pinOut(rpi.pins.leftReverse, false, callback);
  		}
    ]);
  }
};

module.exports = motors;
