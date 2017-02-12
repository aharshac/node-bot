$( document ).ready(function () {
  var socket = null;
  var ui = {
    moveLeft: $('#left[name="move"]'),
    moveForward: $('#forward[name="move"]'),
    moveReverse: $('#reverse[name="move"]'),
    moveRight: $('#right[name="move"]'),

    cameraLeft: $('#left[name="camera"]'),
    cameraUp: $('#up[name="camera"]'),
    cameraCenter: $('#center[name="camera"]'),
    cameraDown: $('#down[name="camera"]'),
    cameraRight: $('#right[name="camera"]'),

    allButtons: $('.button'),

    containerStream: $('#container-stream')
  };
  var activeClass = 'is-active';
  var isPressed = false;
  var streamUrl = "http://" + document.location.hostname + "/?action=stream";
  //var streamUrl = "http://192.168.1.51:9000/?action=stream";

  /* Initialise socket.io */
  try {
    socket = io.connect();
  } catch (e) {
    socket = null;
  }

  function socketSend(action) {
    if (socket && action) {
      socket.emit(action);
    }
  }

  function socketSendData(action, data) {
    if (socket && action) {
      socket.emit(action, data);
    }
  }

  function botMove(action) {
    switch(action){
      case 'forward':
        socketSendData('move', 'forward');
        ui.moveForward.addClass(activeClass);
        break;
      case 'reverse':
        socketSendData('move', 'reverse');
        ui.moveReverse.addClass(activeClass);
        break;
      case 'left':
        socketSendData('move', 'left');
        ui.moveLeft.addClass(activeClass);
        break;
      case 'right':
        socketSendData('move', 'right');
        ui.moveRight.addClass(activeClass);
        break;
    }
  }

  function cameraMove(action) {
    switch(action){
      case 'left':
        socketSendData('camera', 'left');
        ui.cameraLeft.addClass(activeClass);
        break;
      case 'up':
        socketSendData('camera', 'up');
        ui.cameraUp.addClass(activeClass);
        break;
      case 'center':
        socketSendData('camera', 'center');
        ui.cameraCenter.addClass(activeClass);
        break;
      case 'down':
        socketSendData('camera', 'down');
        ui.cameraDown.addClass(activeClass);
        break;
      case 'right':
        socketSendData('camera', 'right');
        ui.cameraRight.addClass(activeClass);
        break;
    }
  }

  //  Listener for key presses
  $(document).keydown(function(e){
    if(isPressed) return;

    isPressed = true;
    switch(e.which){
      /* Bot moves */
      case 65: // A
        botMove('left');
        break;
      case 87:  // W
        botMove('forward');
        break;
      case 83:  // S
        botMove('reverse');
        break;
      case 68: // D
        botMove('right');
        break;

      /* Camera orientation */
      case 52: case 100: // 4
        cameraMove('left');
        break;
      case 56: case 104: // 8
        cameraMove('up');
        break;
      case 53: case 101: // 5
        cameraMove('center');
        break;
      case 50: case 98: // 2
        cameraMove('down');
        break;
      case 54: case 102: // 6
        cameraMove('right');
        break;
    }
  });

  $(document).keyup(function(e){
    ui.allButtons.removeClass(activeClass);
    socketSend('stop');
    isPressed = false;
  });

  $('.button').on("mousedown vmousedown", function(e) {
    if(isPressed) return;

    isPressed = true;
    var target = e.target;

    if (target && $(target).attr('name') && $(target).attr('id')) {
      var name = $(target).attr('name');
      var id = $(target).attr('id');

      if (name === 'move') {
        botMove(id);
      } else if (name === 'camera') {
        cameraMove(id);
      }
    }
  });

  $('.button').on("mouseup vmouseup", function() {
    ui.allButtons.removeClass(activeClass);
    socketSend('stop');
    isPressed = false;
  });

  setTimeout(function(){
    ui.containerStream.html('<img src="' + streamUrl + '" alt="Sreaming error." class="stream" id="stream">');
    $('#stream').error(function() {
      ui.containerStream.html('<div class="stream"><h5>Sreaming error.</h5></div>');
    });
  }, 2000);
});
