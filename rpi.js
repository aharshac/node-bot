const fs = require('fs');
const os = require('os');
const async = require('async');

const motors = require('./motors');


const rpi = {};

rpi.isRpi = false;	// Check once if RPi

rpi.GPIO = null;	// GPIO object

rpi.gpio_loaded = false;	// GPIO setup complete?

rpi.os_release_file = "/etc/os-release";	// RPi Raspbian release info

// Check if Pi
rpi.init = function(onInit){
	if(os.platform().toLowerCase() == 'linux' && fs.existsSync(rpi.os_release_file)){
		var data = fs.readFileSync(rpi.os_release_file).toString().toLowerCase();
		rpi.isRpi = (data.indexOf("raspbian") > 0);
	}

	console.log("Raspberry Pi Check : " + rpi.isRpi);

	if (!rpi.isRpi) {
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
};

// Initialize GPIO
rpi.setupGpio = function(onSetupComplete){
	if(rpi.isRpi && rpi.GPIO != null){
    // Repeat for each GPIO pin
    async.parallel(
			[
	      function(callback) {
	        rpi.GPIO.setup(motors.pins.leftForward, rpi.GPIO.DIR_OUT, callback);    // leftForward
	      },
	      function(callback) {
	        rpi.GPIO.setup(motors.pins.leftReverse, rpi.GPIO.DIR_OUT, callback);    // leftReverse
	      },
				function(callback) {
	        rpi.GPIO.setup(motors.pins.rightForward, rpi.GPIO.DIR_OUT, callback);    // rightForward
	      },
	      function(callback) {
	        rpi.GPIO.setup(motors.pins.rightReverse, rpi.GPIO.DIR_OUT, callback);    // rightReverse
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
};

rpi.pinOut = function(pin, value, callback){
  if(rpi.isRpi && rpi.GPIO != null && rpi.gpio_loaded){
    console.log("RPi GPIO " + pin + " = " + value);
    rpi.GPIO.write(pin, value, callback);
  }else{
    callback('rpi-gpio not loaded');
  }
};

module.exports = rpi;
