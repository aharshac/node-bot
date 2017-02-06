const async = require('async');

const rpi = require('./rpi');


const motors = {};

motors.pins = {
  leftForward: 7,
  leftReverse: 11,
  rightForward: 13,
  rightReverse: 15
};

motors.goForward = function(){
  async.parallel([
    function(callback) {
			rpi.pinOut(motors.leftForward, true, callback);
		},
    function(callback) {
			rpi.pinOut(motors.rightForward, true, callback);
		}
  ]);
};

motors.goReverse = function(){
  async.parallel([
		function(callback) {
			rpi.pinOut(motors.leftReverse, true, callback);
		},
    function(callback) {
			rpi.pinOut(motors.rightReverse, true, callback);
		}
  ]);
};

motors.turnLeft = function(){
  async.parallel([
		function(callback) {
			rpi.pinOut(motors.leftReverse, true, callback);
		},
  	function(callback) {
			rpi.pinOut(motors.rightForward, true, callback);
		}
	]);
};

motors.turnRight = function(){
  async.parallel([
		function(callback) {
			rpi.pinOut(motors.rightReverse, true, callback);
		},
    function(callback) {
			rpi.pinOut(motors.leftForward, true, callback);
		}
  ]);
};

motors.stop = function(){
  async.parallel([
		function(callback) {
			rpi.pinOut(motors.leftForward, false, callback);
		},
		function(callback) {
    	rpi.pinOut(motors.rightForward, false, callback);
		},
		function(callback) {
			rpi.pinOut(motors.rightReverse, false, callback);
		},
    function(callback) {
			rpi.pinOut(motors.leftReverse, false, callback);
		}
  ]);
};

module.exports = motors;
