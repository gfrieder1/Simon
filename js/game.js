var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var score = 0;

////////////////// MAIN //////////////////

// add click event listeners to all buttons
$("button").on("click", function(event) {
  // console.log(event.target.id);

  // animate the button click
  animateButtonClick(event.target.id);

  // add the clicked button the the user's pattern
  userClickedPattern.push(event.target.id);

  // compare the current pattern against the game pattern --> game over if
  // mismatch
  for (var i=0; i<userClickedPattern.length; ++i) {
    if (userClickedPattern[i] !== gamePattern[i]) gameOver();
  }

  // if user pattern length is the same as the game pattern length, reset user
  // pattern, increment score, and generate and show the next pattern
  if (userClickedPattern.length === gamePattern.length) {
    userClickedPattern = [];
    ++score;
    nextSequence();
    showSequence();
  }
});

// start the game upon keypress
$(document).on("keypress", function() {
  $("h1").text("Score: " + score);
  nextSequence();
  showSequence();
});

////////////////// FUNCTIONS //////////////////

// game over effect
function gameOver() {

}

// generates the next sequence by pushing a new color to the end
function nextSequence() {
  // generate random number
  var randNum = Math.floor(Math.random() * (3 - 0 + 1) + 0); // (max - min + 1) + min --> inclusive min to max

  // get corresponding color
  var randColor = buttonColors[randNum];

  // push new color into the array
  gamePattern.push(randColor);
}

function animateButtonClick(color) {
  // create the sound that will play
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.volume = 0.2;

  // grab the button element
  var button = $("#" + color);

  // add and remove pressed effect on the button
  button.addClass("pressed");
  setTimeout(function() {
    button.removeClass("pressed");
  }, 100);

  // play the sound
  sound.play();
}

// flash a game element given its color
function flash(color) {
  // create the sound that will play
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.volume = 0.2;

  // grab the button element
  var button = $("#" + color);

  // flash the element, remove the pressed effect, and play the sound
  button.fadeOut(50).fadeIn(50);
  sound.play();
}

// show the current game pattern by flashing the elements with 0.5s delays
async function showSequence() {
  await sleep(1000);
  // flash each element in the game pattern
  for (var i=0; i<gamePattern.length; ++i) {
    flash(gamePattern[i]);
    await sleep(500);
  }
}

// helper function that, when awaited, will pause execution of a function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
