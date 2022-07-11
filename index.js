var gamePattern=[];
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var started=0;
var level=0;

$(document).keypress(function(){
  if(!started){
    nextSequence();
    started = 1;
  }
});

//Handles actions by user
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  makeSound("."+userChosenColour);
  animation($("."+userChosenColour));
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    var audio1 = new Audio('sounds/wrong.mp3');
    audio1.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startover();
  }
}
function startover(){
  level=0;
  gamePattern=[];
  started=0;
}
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //step-3     flashing
  makeSound("."+randomChosenColour);
  animation($("."+randomChosenColour));
}



function makeSound(a){
  switch (a) {
    case ".red":
      var audio1 = new Audio('sounds/red.mp3');
      audio1.play();
      break;

    case ".blue":
      var audio2 = new Audio('sounds/blue.mp3');
      audio2.play();
      break;

    case ".green":
      var audio3 = new Audio('sounds/green.mp3');
      audio3.play();
      break;

    case ".yellow":
      var audio4 = new Audio('sounds/yellow.mp3');
      audio4.play();
      break;
    default:
      console.log(a);
  }

}
function animation(a){
  a.addClass("pressed");
  setTimeout(function(){
    a.removeClass("pressed");
  }, 100);
}
//javaScript execution is not like c/c++ the flow of this language is a bit different.
//First it reads the whole code and executes the ones which doesn't have any event listeners or other things
//then it waits for user action (keypress/click) and it executes that part of code.

// suppose this is code
// addEventListener("keypress")
  //action 1
// addEventListener("click")
  //action 2

// here first it will read whole code then wait for user to do one of the actions either click or keypress
// if user keypresses first then action 1 will be executed
//if user clicks first then action 2 will be executed regardless of the fact that
//addEventListener("keypress")
  //action 1
  // occurs first and didn't executed first
