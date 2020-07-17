var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameHasStarted = false;
var gameLost = false;
var level = 0;

// Suscribing buttons that user click.
$(".btn").click(function()
{
  if(!gameHasStarted || gameLost)
    return;

  var userChosenColor = this.id;
  playButtonAudio(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// Suscribing webpage when user press any key.
$(document).keydown(function()
{
  if(gameHasStarted)
    return;

  nextSequence();
  gameHasStarted = true;
});

function nextSequence()
{
  $('#level-title').text("Level " +level);
  level++;
  var randomIndex = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomIndex];
  gamePattern.push(randomChosenColor);

  flashButton(randomChosenColor);
  playButtonAudio(randomChosenColor);
}

function checkAnswer(lastAnswerIndex)
{
  console.log("Revisión de " +gamePattern[lastAnswerIndex] + " contra " +userClickedPattern[lastAnswerIndex]);
  if(gamePattern[lastAnswerIndex] === userClickedPattern[lastAnswerIndex])
  {
    // Check answer only if the player has pressed the same amount of buttons that the game.
    if(gamePattern.length === userClickedPattern.length)
    {
        setTimeout(function()
        {
          userClickedPattern = [];
          nextSequence();
        }, 1000);
    }
  }else
  {
    gameOver();
  }
}

function gameOver()
{
  $('#level-title').text("Game Over, Press Any Key to Restart");
  playGameOverAudio();
  flashWebPage();
  gameLost = true;
  resetGame();
}

function resetGame()
{
  gameLost = false;
  gameHasStarted = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

function flashButton(buttonID)
{
  $('#'+buttonID).fadeOut(100).fadeIn(100);
}

function animatePress(buttonID)
{
  $('#'+buttonID).addClass("pressed");
  setTimeout(function()
  {
    $('#'+buttonID).removeClass("pressed");
  }, 100);
}

function playButtonAudio(buttonID)
{
  var audio = new Audio("sounds/"+buttonID+".mp3");
  audio.play();
}

function playGameOverAudio()
{
  var gameOverAudio = new Audio("sounds/wrong.mp3");
  gameOverAudio.play();
}

function flashWebPage()
{
  $("body").addClass("game-over");
  setTimeout(function()
  {
    $("body").removeClass("game-over");
  }, 200);
}
