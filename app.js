let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
// store the colors that got clicked
let userClickedPattern = [];

// keep track if game started
let gameStartedOrNot = false;

// start at lvl 0
let level = 0;


$(document).keypress(function() {
    // if the game started
    if (!gameStartedOrNot) {
        // when the game starts, h1 txt changes to "Level 0"
        $("#level-title").text("Level " + level);

        // we call the function to get to the next level
        nextSequence();
        gameStartedOrNot = true;
    }
});



// we detect the buttons that have been clicked
$(".btn").click(function() {
    // storing the id's of btn that got clicked
    let userChosenColor = $(this).attr("id");
    // push into the array
    userClickedPattern.push(userChosenColor);
    // we verify that this method works
    console.log(userClickedPattern);
    // when a user clicks on a button, the corresponding sound should be played
    playSound(userChosenColor);

    animatePress(userChosenColor);

    // after a user has clicked and chosen their answer, 
    // passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    // verify if the last answer from user is the same answer as the game pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("succes");
        //  if the condition above is right(user's last answer is right)
        // now we check if the user finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        // if user wrong we play an alert sound
        playSound("wrong");

        // add the class game-over to display red if user is wrong
        $("body").addClass("game-over");
        setTimeout(() => {
            // we delete the class after 0.5 seconds
            $("body").removeClass("game-over");
        }, 500);

        // display to the user an message that the game has ended
        $("#level-title").text("Game over, press a key to restart!");
        checkAnswer();

        // if the user missed the pattern, we reset the game
        restartGame();
    }
}


function nextSequence() {

    userClickedPattern = [];

    level++;

    // now after level is incremented, h1 updated to the new level
    $("#level-title").text("Level " + level);

    // generate numbers from 0 to 3
    let randomNumber = Math.floor(Math.random() * 4);

    // select random colors from the buttonColours array
    let randomChosenColour = buttonColours[randomNumber];

    // add the random color to the game pattern
    gamePattern.push(randomChosenColour);

    // select id's to make an flash animation on buttons
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // this will make it work for both playing sound in nextSequence() and when the user clicks a button.
    playSound(randomChosenColour);

}


function playSound(name) {
    // add audio
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    // take current color id and add .pressed class to the btn that gets clicked
    $("#" + currentColor).addClass("pressed");

    // make the flash duration last 0.1 second
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

// we restart the game putting variables default again
function restartGame() {
    level = 0;
    gamePattern = [];
    gameStartedOrNot = false;
}