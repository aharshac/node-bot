const async = require('async');

const rpi = require('./rpi');


const controller = {
  moveForward: function() {
    async.parallel([
      function(callback) {
  			rpi.pinHigh(rpi.pins.leftForward, callback);
  		},
      function(callback) {
  			rpi.pinHigh(rpi.pins.rightForward, callback);
  		}
    ]);
  },

  moveReverse: function() {
    async.parallel([
  		function(callback) {
  			rpi.pinOut(rpi.pins.leftReverse, true, callback);
  		},
      function(callback) {
  			rpi.pinOut(rpi.pins.rightReverse, true, callback);
  		}
    ]);
  },

  moveLeft: function() {
    async.parallel([
  		function(callback) {
  			rpi.pinOut(rpi.pins.leftReverse, true, callback);
  		},
    	function(callback) {
  			rpi.pinOut(rpi.pins.rightForward, true, callback);
  		}
  	]);
  },

  moveRight: function() {
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

module.exports = controller;
