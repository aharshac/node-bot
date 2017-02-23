const five = require("johnny-five");
const Raspi = require("raspi-io");

//const rpi = require('./rpi');

const board = new five.Board({
  io: new Raspi(),
  repl: false,
});


board.on("ready", function() {
				try {
					var pan = new five.Servo({ pin: "P1-12", center: true });
	var tilt = new five.Servo({ pin: "P1-33", startAt: 120 });

pan.to(90, 500);
tilt.to(90, 1000);
				} catch (e) {
					console.log("RPi GPIO setup error " + e);
				}
			});


