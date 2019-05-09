 
function controller(size, InputManager, Actuator) {
  this.size         = size; // Size of the board
   this.inputManager = new InputManager;
   this.actuator     = new Actuator;

  this.running      = false;

  this.inputManager.on("move", this.move.bind(this));
  this.inputManager.on("restart", this.restart.bind(this));

  this.inputManager.on('think', function() {
    var best = this.ai.getBest();
    this.actuator.showHint(best.move);
  }.bind(this));


  this.inputManager.on('run', function() {
    if (this.running) {
      this.running = false;
      this.actuator.setRunButton('RUN');
    } 
    else {
      this.running = true;
      this.run()
     }
  }.bind(this));

  this.setup();
}

// Restart the game
controller.prototype.restart = function () {
  this.actuator.restart();
  this.running = false;
  this.actuator.setRunButton('RUN');
  this.setup();
};

// Set up the game
controller.prototype.setup = function () {
  this.board         = new board(this.size);
  this.board.addStartTiles();

  this.ai           = new AI(this.board);

   this.over         = false;
  this.won          = false;

  // Update the actuator
  this.actuate();
};

//启动游戏
// Sends the updated board to the actuator
controller.prototype.actuate = function () {
  this.actuator.actuate(this.board, {
     won:   this.won
  });
};

// makes a given move and updates state
controller.prototype.move = function(direction) {
  var result = this.board.move(direction);
 
  if (!result.won) {
    if (result.moved) {
      this.board.computerMove();
    }
  } else {
    this.won = true;
  }

 
  if (!this.board.movesAvailable()) {
    this.over = true; // Game over!
  }

  this.actuate();
}

// moves continuously until game is over
controller.prototype.run = function() {
  var best = this.ai.getBest();
  this.move(best.move);
  var timeout = animationDelay;
  if (this.running && !this.over && !this.won) {
    var self = this;
    setTimeout(function(){
      self.run();
    }, timeout);
  }
}
