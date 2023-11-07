const formElement = document.getElementById("submitNumber");
const restartButton = document.getElementById("restart");
let guessInput = document.querySelector("#inputNumber");
let p = document.createElement('p');
let badge = document.getElementsByClassName("badge")[0];

/* 
GAME-SETTINGS
*/
let noOfTries = 0;
let original = null;
let guess = null;
let deviation = null;

function init() {
    formElement.after(formElement, p);
    initializeGame();
    formElement.addEventListener('submit', (event) => { userGuess(event)})
    restartButton.addEventListener('click', (event) => { restartGame(event)})
}

// Controller for an users input
function userGuess(event) {
    event.preventDefault();
    guess = guessInput.value;
    deviation = original - guess;
    noOfTries = noOfTries + 1;
    badge.innerHTML = noOfTries;

    generateResponse(deviation);
}

// Resets the game
function restartGame(event) {
    event.preventDefault();
    initializeGame();
}

// Initializes the default game settings
function initializeGame(){
    p.style="display: none;";
    noOfTries = 0;
    badge.innerHTML = noOfTries;
    original = Math.floor((Math.random() * 1000) + 1);
    guess = null;
    deviation = null;
}

// Method to generate game response 
function generateResponse(deviation){

    p.className = deviation === 0 ? 'alert alert-success' : 'alert alert-warning';

    if (deviation < 0) {
        p.innerHTML = "Your guess is higher.";
    } else if (deviation > 0) {
        p.innerHTML = "Your guess is lower.";
    } else {
        p.innerHTML = "Yes! That's it.";
    }

    p.style="display: block";
}

init();