
 
animationDelay = 100;
minSearchTime = 100;

// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  var manager = new controller(4, InputManagement, Action);
});



//set timer, and call two functions to control the game

