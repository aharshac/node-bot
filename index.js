const rpi = require('./rpi');
const motors = require('./motors');

rpi.init(function(){
  motors.goForward();
});
