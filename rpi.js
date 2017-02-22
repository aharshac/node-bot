const fs = require('fs');
const os = require('os');
const async = require('async');


const rpi = {
	isRaspberryPi: false,	// Check once if RPi

	GPIO: null,	// GPIO object

	os_release_file: "/etc/os-release",	// RPi Raspbian release info

	pinNum: {
    leftForward: "P1-7",
    leftReverse: "P1-11",
    rightForward: "P1-13",
    rightReverse: "P1-15",
		headLight: "P1-8",
  },

	pins: {
		leftForward: null,
    leftReverse: null,
    rightForward: null,
    rightReverse: null,
		headLight: null,
	},

	isRpi: function () {
		return rpi.isRaspberryPi;
	},
	// Check if Pi
	init: function(onInit) {
		if(os.platform().toLowerCase() == 'linux' && fs.existsSync(rpi.os_release_file)){
			var data = fs.readFileSync(rpi.os_release_file).toString().toLowerCase();
			rpi.isRaspberryPi = (data.indexOf("raspbian") > 0);
		}

		console.log("Raspberry Pi Check : " + rpi.isRpi());

		if (!rpi.isRpi()) {
			if (onInit) {
				onInit("Not Pi");	// error = true;
			}
			return;
		}

		try {
			const five = require("johnny-five");
			rpi.GPIO = five;

			const Raspi = require("raspi-io");
			const board = new five.Board({
			  io: new Raspi()
			});

			board.on("ready", function() {
				try {
					rpi.pins.leftForward = new five.Pin({ pin: rpi.pinNum.leftForward, type: "digital" });
					rpi.pins.leftReverse = new five.Pin({ pin: rpi.pinNum.leftReverse, type: "digital" });
					rpi.pins.rightForward = new five.Pin({ pin: rpi.pinNum.rightForward, type: "digital" });
					rpi.pins.rightReverse = new five.Pin({ pin: rpi.pinNum.rightReverse, type: "digital" });
					rpi.pins.headLight = new five.Pin({ pin: rpi.pinNum.headLight, type: "digital" });
					onInit(false);
				} catch (e) {
					onInit("RPi GPIO setup error " + e);
				}
			});
		} catch (ex) {
			onInit("RPi GPIO setup error " + ex);
		}
	},

	pinHigh: function(pin) {
		if (pin) pin.high();
	},

	pinLow: function(pin, callback) {
		if (pin) pin.low();
	}
};

module.exports = rpi;
