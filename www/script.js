$(function () {
  var socket = io.connect(),
    ui = {
      up: $('.btn-up'),
      left: $('.btn-left'),
      down: $('.btn-down'),
      right: $('.btn-right'),
      all: $('.btn')
    },
    activeClass = 'is-active',
    isPressed = false;

  function botMove(action) {
    switch(action){
      case 'forward':
        socket.emit('move', 'forward');
        ui.up.addClass(activeClass);
        break;
      case 'backward':
        socket.emit('move', 'backward');
        ui.down.addClass(activeClass);
        break;
      case 'left':
        socket.emit('move', 'left');
        ui.left.addClass(activeClass);
        break;
      case 'right':
        socket.emit('move', 'right');
        ui.right.addClass(activeClass);
        break;
    }
  }

  //listen for key presses
  $(document).keydown(function(e){
    //don't do anything if there's already a key pressed
    if(isPressed) return;

    isPressed = true;
    switch(e.which){
      case 87:
        botMove('forward');
        break;
      case 83:
        botMove('backward');
        break;
      case 65:
        botMove('left');
        break;
      case 68:
        botMove('right');
        break;
    }
  });

  //stop all motors when any key is released
  $(document).keyup(function(e){
    ui.all.removeClass(activeClass);
    socket.emit('stop');
    isPressed = false;
  });
});
