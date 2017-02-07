const async = require('async');

const rpi = require('./rpi');


const motors = {};

motors.pins = {
  leftForward: 7,
  leftReverse: 11,
  rightForward: 13,
  rightReverse: 15
};

motors.goForward = function() {
  async.parallel([
    function(callback) {
			rpi.pinHigh(motors.pins.leftForward, callback);
		},
    function(callback) {
			rpi.pinHigh(motors.pins.rightForward, callback);
		}
  ]);
};

motors.goReverse = function() {
  async.parallel([
		function(callback) {
			//rpi.pinOut(motors.pins.leftReverse, true, callback);
			callback(false, 1);
		},
    function(callback) {
			//rpi.pinOut(motors.pins.rightReverse, true, callback);
			callback(false, 1);
		}
  ]);
};

motors.turnLeft = function(){
  async.parallel([
		function(callback) {
			rpi.pinOut(motors.pins.leftReverse, true, callback);
		},
  	function(callback) {
			rpi.pinOut(motors.pins.rightForward, true, callback);
		}
	]);
};

motors.turnRight = function(){
  async.parallel([
		function(callback) {
			rpi.pinOut(motors.pins.rightReverse, true, callback);
		},
    function(callback) {
			rpi.pinOut(motors.pins.leftForward, true, callback);
		}
  ]);
};

motors.stop = function(){
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
};

module.exports = motors;
