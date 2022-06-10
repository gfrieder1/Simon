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
