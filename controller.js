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
      rpi.pinLow(rpi.pins.headLight);
      controller.stopHeadLightTimer();
      if (callback) callback(controller.headLightOn);
    }, 30000);
  },

  stopHeadLightTimer: function() {
    clearTimeout(controller.headLightTimeoutId);
  },

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

  changeHeadLightState: function(callback) {
    controller.headLightOn = !controller.headLightOn;
    controller.startHeadLightTimer(callback);
    if (controller.headLightOn) {
      rpi.pinHigh(rpi.pins.headLight);
    } else {
      rpi.pinLow(rpi.pins.headLight);
    }
    if (callback) callback(controller.headLightOn);
  }
};

module.exports = controller;
