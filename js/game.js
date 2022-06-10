var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function nextSequence() {
  // generate random number
  var randNum = Math.floor(Math.random() * (3 - 0 + 1) + 0); // (max - min + 1) + min --> inclusive min to max

  // get corresponding color
  var randColor = buttonColors[randNum];

  // push new color into the array
  gamePattern.push(randColor)
}

function flash(color) {
  // create the sound that will play
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.volume = 0.2;

  // flash the element and play the sound
  $("#" + color).fadeOut(50).fadeIn(50);
  sound.play();
}

async function showSequence() {
  // flashes each element in the game pattern
  for (var i=0; i<gamePattern.length; ++i) {
    flash(gamePattern[i]);
    await sleep(500);
  }
}
