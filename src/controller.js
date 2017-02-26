const rpi = require('./rpi');


const controller = {
  motorsTimeoutId: 0,

  headLightTimeoutId: 0,

  servoTimeoutId: 0,

  headLightOn: false,

  /* Timers */
  startMotorsTimer: function() {
    controller.stopMotorsTimer();
    controller.motorsTimeoutId = setTimeout(function() {
      controller.stopMotors();
    }, 3000);
  },

  stopMotorsTimer: function() {
    clearTimeout(controller.motorsTimeoutId);
  },

  startHeadLightTimer: function(callback) {
    controller.stopHeadLightTimer();
    controller.headLightTimeoutId = setTimeout(function() {
      controller.headLightOn = false;
      rpi.pinLow(rpi.pins.headLight);
      controller.stopHeadLightTimer();
      if (callback) callback(controller.headLightOn);
    }, 30000);
  },

  stopHeadLightTimer: function() {
    clearTimeout(controller.headLightTimeoutId);
  },

  startServosTimer: function() {
    controller.stopServosTimer();
    controller.servoTimeoutId = setTimeout(function() {
      controller.stopServos();
    }, 1000);
  },

  stopServosTimer: function() {
    clearTimeout(controller.servoTimeoutId);
  },

  /* Motors */
  moveForward: function() {
    try {
      rpi.pinHigh(rpi.pins.leftForward);
      rpi.pinHigh(rpi.pins.rightForward);
    } catch (e) {
      console.log("RPi GPIO moveForward error " + e);
    } finally {
      controller.startMotorsTimer();
    }
  },

  moveReverse: function() {
    try {
      rpi.pinHigh(rpi.pins.leftReverse);
      rpi.pinHigh(rpi.pins.rightReverse);
    } catch (e) {
      console.log("RPi GPIO moveReverse error " + e);
    } finally {
      controller.startMotorsTimer();
    }
  },

  moveLeft: function() {
    try {
      rpi.pinHigh(rpi.pins.leftReverse);
      rpi.pinHigh(rpi.pins.rightForward);
    } catch (e) {
      console.log("RPi GPIO moveLeft error " + e);
    } finally {
      controller.startMotorsTimer();
    }
  },

  moveRight: function() {
    try {
      rpi.pinHigh(rpi.pins.rightReverse);
      rpi.pinHigh(rpi.pins.leftForward);
    } catch (e) {
      console.log("RPi GPIO moveRight error " + e);
    } finally {
      controller.startMotorsTimer();
    }
  },

  stopMotors: function() {
    controller.stopMotorsTimer();
    try {
      rpi.pinLow(rpi.pins.leftForward);
      rpi.pinLow(rpi.pins.leftReverse);
      rpi.pinLow(rpi.pins.rightForward);
      rpi.pinLow(rpi.pins.rightReverse);
    } catch (e) {
      console.log("RPi GPIO stopMotors error " + e);
    }
  },

  /* Headlight */
  changeHeadLightState: function(callback) {
    controller.headLightOn = !controller.headLightOn;
    controller.startHeadLightTimer(callback);
    if (controller.headLightOn) {
      rpi.pinHigh(rpi.pins.headLight);
    } else {
      rpi.pinLow(rpi.pins.headLight);
    }
    if (callback) callback(controller.headLightOn);
  },

  /* Camera */
  servoPanLeft: function() {
    try {
      var currentAngle = rpi.servos.cameraPan.position;
      if (currentAngle + rpi.servoAngles.changePan >= rpi.servoAngles.maxPan){
        currentAngle = rpi.servoAngles.maxPan;
      } else {
        currentAngle += rpi.servoAngles.changePan;
      }
      rpi.servos.cameraPan.to(currentAngle);
    } catch (e) {
      console.log("RPi GPIO servoPanLeft error " + e);
    } finally {
      controller.startServosTimer();
    }
  },

  servoPanRight: function() {
    try {
      var currentAngle = rpi.servos.cameraPan.position;
      if (currentAngle - rpi.servoAngles.changePan <= rpi.servoAngles.minPan){
        currentAngle = rpi.servoAngles.minPan;
      } else {
        currentAngle -= rpi.servoAngles.changePan;
      }
      rpi.servos.cameraPan.to(currentAngle);
    } catch (e) {
      console.log("RPi GPIO servoPanRight error " + e);
    } finally {
      controller.startServosTimer();
    }
  },

  servoTiltDown: function() {
    try {
      var currentAngle = rpi.servos.cameraTilt.position;
      if (currentAngle + rpi.servoAngles.changeTilt >= rpi.servoAngles.maxTilt) {
        currentAngle = rpi.servoAngles.maxTilt;
      } else {
        currentAngle += rpi.servoAngles.changeTilt;
      }
      rpi.servos.cameraTilt.to(currentAngle);
    } catch (e) {
      console.log("RPi GPIO servoTiltUp error " + e);
    } finally {
      controller.startServosTimer();
    }
  },

  servoTiltUp: function() {
    try {
      var currentAngle = rpi.servos.cameraTilt.position;
      if (currentAngle - rpi.servoAngles.changeTilt <= rpi.servoAngles.minTilt) {
        currentAngle = rpi.servoAngles.minTilt;
      } else {
        currentAngle -= rpi.servoAngles.changeTilt;
      }
      rpi.servos.cameraTilt.to(currentAngle);
    } catch (e) {
      console.log("RPi GPIO servoTiltDown error " + e);
    } finally {
      controller.startServosTimer();
    }
  },

  servosCenter: function() {
    try {
      rpi.servos.cameraPan.center();
      rpi.servos.cameraTilt.center();
    } catch (e) {
      console.log("RPi GPIO servosCenter error " + e);
    } finally {
      controller.startServosTimer();
    }
  },

  stopServos: function() {
    controller.stopServosTimer();
    try {
      rpi.servos.cameraPan.stop();
      rpi.servos.cameraTilt.stop();
    } catch (e) {
      console.log("RPi GPIO stopServos error " + e);
    }
  },
};

module.exports = controller;
