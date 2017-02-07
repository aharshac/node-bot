const rpi = require('./rpi');
//const motors = require('./motors');
const server = require('./server');

function initServer() {
  server.init(function(error, port) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server started on port ' + port);
    }
  });
}

rpi.init(function(error){
  if (!error) {
    //console.log(typeof rpi.pinHigh);
    initServer();
  } else {
    console.log(error);
  }
});
