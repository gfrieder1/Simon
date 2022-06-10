var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];

function nextSequence() {
  // generate random number
  var randNum = Math.floor(Math.random() * (3 - 0 + 1) + 0); // (max - min + 1) + min --> inclusive min to max

  // get corresponding color
  var randColor = buttonColors[randNum];

  // push new color into the array
  gamePattern.push(randColor)
}

function flash(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.volume = 0.2;

  $("#" + color).fadeOut(50).fadeIn(50);
  sound.play();
}
