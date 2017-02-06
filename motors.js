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
    rpi.pinOut(motors.leftForward, true),
    rpi.pinOut(motors.rightForward, true);
  ]);
};

motors.goReverse = function(){
  async.parallel([
		rpi.pinOut(motors.leftReverse, true),
    rpi.pinOut(motors.rightReverse, true);
  ]);
};

motors.turnLeft = function(){
  async.parallel([
		rpi.pinOut(motors.leftReverse, true),
    rpi.pinOut(motors.rightForward, true);
  ]);
};

motors.turnRight = function(){
  async.parallel([
		rpi.pinOut(motors.rightReverse, true),
    rpi.pinOut(motors.leftForward, true);
  ]);
};

motors.stop = function(){
  async.parallel([
		rpi.pinOut(motors.leftForward, false),
    rpi.pinOut(motors.rightForward, false),
		rpi.pinOut(motors.rightReverse, false),
    rpi.pinOut(motors.leftReverse, false);
  ]);
};

//stop both motors in all directions
stop: function(){
  async.parallel([
    gpio.write(this.motors.leftFront, 0),
    gpio.write(this.motors.leftBack, 0),
    gpio.write(this.motors.rightFront, 0),
    gpio.write(this.motors.rightBack, 0)
  ]);
}

module.exports = motors;
