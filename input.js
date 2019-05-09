
 

function InputManagement() {
  this.events = {};

  this.listen();
}

InputManagement.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

InputManagement.prototype.emit = function (event, data) {
  var callbacks = this.events[event];
  if (callbacks) {
    callbacks.forEach(function (callback) {
      callback(data);
    });
  }
};

InputManagement.prototype.listen = function () {
  var self = this; 
  var retry = document.getElementsByClassName("retry-button")[0];
  retry.addEventListener("click", this.restart.bind(this));

 
  var runButton = document.getElementById('run-button');
  runButton.addEventListener('click', function(e) {
    e.preventDefault();
    self.emit('run')
  })
   var gameContainer = document.getElementsByClassName("game-container")[0];
  var handler       = Hammer(gameContainer, {
    drag_block_horizontal: true,
    drag_block_vertical: true
  });
  
  handler.on("swipe", function (event) {
    event.gesture.preventDefault();
    mapped = gestures.indexOf(event.gesture.direction);

    if (mapped !== -1) self.emit("move", mapped);
  });
};

InputManagement.prototype.restart = function (event) {
  event.preventDefault();
  this.emit("restart");
};
