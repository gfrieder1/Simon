let buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var score = 0;
var gameOverFlag = 0;
let masterVolume = 0.2;

////////////////// MAIN //////////////////

// start the game upon keypress (at any time!)
gameStart();

////////////////// FUNCTIONS //////////////////

// adds the "handleClick" event listener to all buttons
function enableButtons() {
  $("button").on("click", handleClick);
}

// removes the "handleClick" event listener from all buttons
function disableButtons() {
  $("button").off("click", handleClick);
}

// starts the game
function gameStart() {
  // adds an event listener to the document to start the game upon keypress
  $(document).on("keypress", function() {
    // clears all stored data
    gamePattern = [];
    userClickedPattern = [];
    score = 0;
    gameOverFlag = 0;

    // updates score header
    $("h1").text("Score: " + score);

    // begins sequence generation (buttons are enabled at the end of showSequence())
    nextSequence();
    showSequence();
  });
}

// ends the game
function gameOver() {
  // update gameOverFlag
  gameOverFlag = 1;

  // create game over sound
  var gameOverSound = new Audio("sounds/wrong.mp3");
  gameOverSound.volume = masterVolume;

  // disable buttons until new game
  disableButtons();

  // flash background red
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);

  // update header to reflect end of game
  $("h1").text("Game Over, Press Any Key to Restart");

  // play game over sound
  gameOverSound.play();
}


// checks user's answer and goes to game over if it's wrong
function checkAnswer() {
  // compare every element of the user's pattern against the game pattern
  for (var i = 0; i < userClickedPattern.length; ++i) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      gameOver();
      break;
    }
  }

  // NOTE: Yes, this method will eventually become slower. That shouldn't happen
  //       until very very large numbers though...
}

function handleClick() {
  //console.log(this);

  // animate the button click
  animateButtonClick(this.id);

  // add the clicked button the the user's pattern
  userClickedPattern.push(this.id);

  // check for wrong answer
  checkAnswer();

  // if user pattern length is the same as the game pattern length, reset user
  // pattern, increment score, and generate and show the next pattern
  if (userClickedPattern.length === gamePattern.length && !gameOverFlag) {
    userClickedPattern = [];
    ++score;
    $("h1").text("Score: " + score);
    nextSequence();
    showSequence();
  }
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
  sound.volume = masterVolume;

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
  sound.volume = masterVolume;

  // grab the button element
  var button = $("#" + color);

  // flash the element, remove the pressed effect, and play the sound
  button.fadeOut(50).fadeIn(50);
  sound.play();
}

// show the current game pattern by flashing the elements with 0.5s delays
async function showSequence() {
  if (!gameOverFlag) {

    // disable buttons while pattern is being shown
    disableButtons();

    await sleep(1000);
    // flash each element in the game pattern
    for (var i = 0; i < gamePattern.length; ++i) {
      flash(gamePattern[i]);
      await sleep(500);
    }

    // re-enable buttons
    enableButtons();
  }
}

// helper function that, when awaited, will pause execution of a function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
