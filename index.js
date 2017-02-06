const rpi = require('./rpi');
const motors = require('./motors');

rpi.init(function(error){
  if (!error) {
    motors.goForward();
  }
});
