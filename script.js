let playerName = prompt("Enter name here:");
let newPlayerName = playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();


let answer = 0;
let guessCount = 0;
let startTime = 0;
let range = 0;
const scores = [];
const times = [];


document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);


setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call


function updateDateTime() {
   const now = new Date();
   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   const month = months[now.getMonth()];
   const year = now.getFullYear();
   const date = now.getDate();
  
   let suffix = "th";
   if (date % 10 === 1 && date !== 11) suffix = "st";
   else if (date % 10 === 2 && date !== 12) suffix = "nd";
   else if (date % 10 === 3 && date !== 13) suffix = "rd";


   const timeStr = now.toLocaleTimeString(); // Includes seconds for Test 11
   document.getElementById("date").textContent = `${month} ${date}${suffix}, ${year} - ${timeStr}`;
}


function play() {
   let levels = document.getElementsByName("level");
   range = 0;
   for (let i = 0; i < levels.length; i++) {
       if (levels[i].checked) {
           range = parseInt(levels[i].value);
       }
       levels[i].disabled = true;
   }


   if (range === 0) return;


   answer = Math.floor(Math.random() * range) + 1;
   guessCount = 0;
   startTime = new Date().getTime();


   document.getElementById("guess").addEventListener("keypress", function (e){
   if (e.key === "Enter"){
       document.getElementById("guessBtn").click();
   }
});


   document.getElementById("msg").textContent = newPlayerName + ", guess a number 1-" + range;
   document.getElementById("guessBtn").disabled = false;
   document.getElementById("giveUpBtn").disabled = false;
   document.getElementById("playBtn").disabled = true;
}


function makeGuess() {
   let guess = parseInt(document.getElementById("guess").value);
   let msg = document.getElementById("msg");
  
   if (isNaN(guess)) return;
   guessCount++;


   let diff = Math.abs(guess - answer);
   let feedback = "";


   if (guess === answer) {
       msg.textContent = "Correct " + newPlayerName + "! It took " + guessCount + " tries.";
       endRound(guessCount);
       confetti();
   } else {
      
       let direction = guess < answer ? "low" : "high";
      
       let temp = "";
       if (diff <= 2) temp = "hot";
       else if (diff <= 5) temp = "warm";
       else temp = "cold";


       msg.textContent = `Too ${direction}. You are ${temp}!`;
   }
}


function giveUp() {
   document.getElementById("msg").textContent = "The number was " + answer + ". Better luck next time!";
   endRound(range);
}


function endRound(finalScore) {
   let endTime = new Date().getTime();
   updateTimers(endTime - startTime);
   updateScore(finalScore);
   reset();
}


function updateScore(score) {
   scores.push(score);
   document.getElementById("wins").textContent = "Total wins: " + scores.length;
  
   let sum = scores.reduce((a, b) => a + b, 0);
   document.getElementById("avgScore").textContent = "Average Score: " + (sum / scores.length).toFixed(1);


   scores.sort((a, b) => a - b);
   let lb = document.getElementsByName("leaderboard");
   for (let i = 0; i < lb.length; i++) {
       if (scores[i] !== undefined) lb[i].textContent = scores[i];
   }
}


function updateTimers(elapsedMs) {
   let seconds = elapsedMs / 1000;
   times.push(seconds);
  
   let fastest = Math.min(...times);
   let avgTime = times.reduce((a, b) => a + b, 0) / times.length;


   document.getElementById("fastest").textContent = "Fastest: " + fastest.toFixed(1) + "s";
   document.getElementById("avgTime").textContent = "Avg Time: " + avgTime.toFixed(1) + "s";
}


function reset() {
   document.getElementById("guess").value = "";
   document.getElementById("guessBtn").disabled = true;
   document.getElementById("giveUpBtn").disabled = true;
   document.getElementById("playBtn").disabled = false;


   let levels = document.getElementsByName("level");
   levels.forEach(l => l.disabled = false);
}

