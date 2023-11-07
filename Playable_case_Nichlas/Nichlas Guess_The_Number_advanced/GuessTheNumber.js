const formElement = document.getElementById("submit-number");
const restartButton = document.getElementById("restart");
const newMode = document.getElementById("select-new-mode");
let guessInput = document.querySelector("#input-number");
let p = document.createElement('p');
let badge = document.getElementsByClassName("badge")[0];
let infoBox = document.getElementById("info-box");

const welcome = document.getElementById("welcome-container");
const options = document.getElementById("options-container");
const game = document.getElementById("game-container");

const beginBtn = document.getElementById("begin");

const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");

/* 
GAME-SETTINGS
*/

let noOfTries = 0;
let original = null;
let guess = null;
let deviation = null;
let selectedGameMode = null;

function init() {
    formElement.after(formElement, p);
    formElement.addEventListener('submit', (event) => { userGuess(event)})
    restartButton.addEventListener('click', (event) => { restartGame(event)})
    newMode.addEventListener('click', (event) => { selectNewMode(event)})

    beginBtn.addEventListener('click', (event) => { onBegin(event)})

    easyBtn.addEventListener('click', (event) => { easyMode(event)})
    mediumBtn.addEventListener('click', (event) => { mediumMode(event)})
    hardBtn.addEventListener('click', (event) => { hardMode(event)})
}

function onBegin(event) {
    event.preventDefault();
    options.classList.remove("nonVisible");
    welcome.classList.add("nonVisible");
}

function selectNewMode(event) {
    event.preventDefault();
    game.classList.add('nonVisible');
    onBegin(event);
}

function easyMode(event) {
    event.preventDefault();
    selectedGameMode = 10;
    infoBox.innerHTML = "Guess the computer generated random number between 1 and 10."
    initializeGame(selectedGameMode);

}

function mediumMode(event) {
    event.preventDefault();
    selectedGameMode = 100;
    infoBox.innerHTML = "Guess the computer generated random number between 1 and 100."
    initializeGame(selectedGameMode);
}

function hardMode(event) {
    event.preventDefault();
    selectedGameMode = 1000;
    infoBox.innerHTML = "Guess the computer generated random number between 1 and 1000."
    initializeGame(selectedGameMode);
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
    initializeGame(selectedGameMode);
}

// Initializes the default game settings
function initializeGame(mode){
    game.classList.remove('nonVisible');
    options.classList.add('nonVisible');
    p.style="display: none;";
    guessInput.value = null;
    noOfTries = 0;
    badge.innerHTML = noOfTries;
    original = Math.floor((Math.random() * mode) + 1);
    guess = null;
    deviation = null;
}

// Method to generate game response 
function generateResponse(deviation){
    p.className = deviation === 0 ? 'alert alert-success' : 'alert alert-warning';
    if (p.classList.contains('popout')) {
        p.classList.remove('popout');
    }
    p.classList.add('popout');

    //TODO trigger popout everytime.

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