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
    rightReverse: 15
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
	    const lib_rpiGpio = require('rpi-gpio');
	    rpi.GPIO = lib_rpiGpio;
		} catch (ex) {
			console.log("Could not initialize GPIO library.");
			return;
		}
	  rpi.setupGpio(onInit);
	},

	// Initialize GPIO
	setupGpio: function(onSetupComplete) {
		if(rpi.isRpi() && rpi.GPIO != null){
	    // Repeat for each GPIO pin
	    async.parallel(
				[
		      function(callback) {
		        rpi.GPIO.setup(rpi.pins.leftForward, rpi.GPIO.DIR_OUT, callback);    // leftForward
		      },
		      function(callback) {
		        rpi.GPIO.setup(rpi.pins.leftReverse, rpi.GPIO.DIR_OUT, callback);    // leftReverse
		      },
					function(callback) {
		        rpi.GPIO.setup(rpi.pins.rightForward, rpi.GPIO.DIR_OUT, callback);    // rightForward
		      },
		      function(callback) {
		        rpi.GPIO.setup(rpi.pins.rightReverse, rpi.GPIO.DIR_OUT, callback);    // rightReverse
		      },
		    ],
				function(err, results) {
		      rpi.gpio_loaded = !err;
		      if (err) {
		        console.log("RPi GPIO setup error " + err);
					}
					if (onSetupComplete) {
						onSetupComplete(err);
					}
		    }
			);
		}
	},

	pinOut: function(pin, value, callback) {
	  if(rpi.isRpi() && rpi.GPIO != null && rpi.gpio_loaded) {
	    rpi.GPIO.write(pin, value, callback);
	  } else {
	    callback(true, null);
	  }
	},

	pinHigh: function(pin, callback) {
		rpi.pinOut(pin, true, callback);
	},

	pinLow: function(pin, callback) {
		rpi.pinOut(pin, false, callback);
	}
};

module.exports = rpi;
