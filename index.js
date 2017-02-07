const rpi = require('./rpi');
const motors = require('./motors');

rpi.init(function(error){
  if (!error) {
    console.log(typeof rpi.pinHigh);
    //motors.goForward();
  }
});
