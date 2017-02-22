const fs = require('fs');
const os = require('os');
const async = require('async');


const rpi = {
	isRaspberryPi: false,	// Check once if RPi

	GPIO: null,	// GPIO object

	gpio_loaded: false,	// GPIO setup complete?

	os_release_file: "/etc/os-release",	// RPi Raspbian release info

	pins: {
    leftForward: 7,
    leftReverse: 11,
    rightForward: 13,
    rightReverse: 15,
		headLight: 8
  },

	isRpi: function () {
		return rpi.isRaspberryPi;
	},

	getGpio: function () {
		return rpi.GPIO;
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
				onInit(true);	// error = true;
			}
			return;
		}

		try {
	    const lib_rpiGpio = require('rpio');
	    rpi.GPIO = lib_rpio;
		} catch (ex) {
			console.log("Could not initialize GPIO library.");
			return;
		}
	  rpi.setupGpio(onInit);
	},

	// Initialize GPIO
	setupGpio: function(onSetupComplete) {
		if (rpi.isRpi() && rpi.GPIO != null) {
			try {
				var rpio = rpi.GPIO;
				rpio.init({gpiomem: false, mapping: 'physical'});
				rpio.open(rpi.pins.leftForward, rpio.OUTPUT, rpio.LOW);
				rpio.open(rpi.pins.leftReverse, rpio.OUTPUT, rpio.LOW);
				rpio.open(rpi.pins.rightForward, rpio.OUTPUT, rpio.LOW);
				rpio.open(rpi.pins.rightReverse, rpio.OUTPUT, rpio.LOW);
				rpio.open(rpi.pins.headLight, rpio.OUTPUT, rpio.LOW);
				rpi.gpio_loaded = true;
				onSetupComplete(false);
			} catch (e) {
				console.log("RPi GPIO setup error " + e);
				onSetupComplete(e);
			}
		}
	},

	pinOut: function(pin, value) {
		try {
			if(rpi.isRpi() && rpi.GPIO != null && rpi.gpio_loaded) {
				rpi.GPIO.write(pin, value);
		  }
		} catch (e) {
			console.log("RPi GPIO pinOut error " + e);
		}
	},

	pinHigh: function(pin) {
		rpi.pinOut(pin, rpi.GPIO.HIGH);
	},

	pinLow: function(pin, callback) {
		rpi.pinOut(pin, rpi.GPIO.LOW);
	}
};

module.exports = rpi;
