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
		return this.isRaspberryPi;
	},

	getGpio: function () {
		return this.GPIO;
	},

	// Check if Pi
	init: function(onInit) {
		if(os.platform().toLowerCase() == 'linux' && fs.existsSync(this.os_release_file)){
			var data = fs.readFileSync(this.os_release_file).toString().toLowerCase();
			this.isRaspberryPi = (data.indexOf("raspbian") > 0);
		}

		console.log("Raspberry Pi Check : " + this.isRpi());

		if (!this.isRpi()) {
			if (onInit) {
				onInit(true);	// error = true;
			}
			return;
		}

		try {
	    const lib_rpiGpio = require('rpi-gpio');
	    this.GPIO = lib_rpiGpio;
		} catch (ex) {
			console.log("Could not initialize GPIO library.");
			return;
		}
	  this.setupGpio(onInit);
	},

	// Initialize GPIO
	setupGpio: function(onSetupComplete) {
		if(this.isRpi() && this.GPIO != null){
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
		      this.gpio_loaded = !err;
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
		this.pinOut(pin, true, callback);
	},

	pinLow: function(pin, callback) {
		this.pinOut(pin, false, callback);
	}
};

module.exports = rpi;
