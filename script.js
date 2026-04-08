let answer = 0;
let guessCount = 0;
const scores = [];

// Define your elements clearly
const msg = document.getElementById("msg");
const wins = document.getElementById("wins");
const avgScore = document.getElementById("avgScore");
const guessBtn = document.getElementById("guessBtn");
const playBtn = document.getElementById("playBtn");


document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);

function play() {
    let range = 0;
    let levels = document.getElementsByName("level");
    for (let i = 0; i < levels.length; i++) {
        if (levels[i].checked) {
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }

    msg.textContent = "Guess a number 1-" + range;
    answer = Math.floor(Math.random() * range) + 1;
    guessCount = 0;

    guessBtn.disabled = false;
    playBtn.disabled = true;
}

function makeGuess() {
    let guess = parseInt(document.getElementById("guess").value);
    if (isNaN(guess)) {
        msg.textContent = "Please enter a valid number";
        return;
    }
    guessCount++;
    if (guess == answer) {
        msg.textContent = "Correct! It took " + guessCount + " tries.";
        updateScore();
        resetGame(); 
    } else if (guess < answer) {
        msg.textContent = "Too low, try again";
    } else {
        msg.textContent = "Too high, try again";
    }
} // Close makeGuess here

function updateScore() { // Use () here
    scores.push(guessCount); // Push the count
    wins.textContent = "Total wins: " + scores.length;
    
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    avgScore.textContent = "Average Score: " + (sum / scores.length).toFixed(1);

    scores.sort(function(a, b) { return a - b; });

    let lb = document.getElementsByClassName("leaderboard"); // Changed to ClassName for better use
    for (let i = 0; i < lb.length; i++) {
        if (i < scores.length) {
            lb[i].textContent = scores[i]; 
        }
    }
}

function reset() {
    guessBtn.disabled = true;
    playBtn.disabled = false;
    let levels = document.getElementsByName("level");
    for (let i = 0; i < levels.length; i++) {
        levels[i].disabled = false;
    }
}
function resetGame(){
msg.value = "";
guessBtn.disabled = true;
giveUpBtn.disabled = true;
playBtn.disabled = false;
e.disabled = false;
m.disabled = false;
h.disabled = false;
}

