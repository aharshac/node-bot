const five = require("johnny-five");
const Raspi = require("raspi-io");

const rpi = require('./rpi');

const board = new five.Board({
  io: new Raspi(),
  repl: false,
});

var pan = new five.Servo({ pin: rpi.pinNum.cameraPan, center: true });
var tilt = new five.Servo({ pin: rpi.pinNum.cameraTilt, startAt: 120 });

pan.sweep();
