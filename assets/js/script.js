// starting score/timer
let timer = 75;
let timerIntervalId = -1;

// start timer to decrement every second
function startQuiz() {
  // display content
  document.getElementById("content").style.display = "block";
  document.getElementById("startButton").style.display = "none";

  timerIntervalId = setInterval(() => {
    timer--;
    document.getElementById("time").innerText = timer;

    // end game case
    if (timer <= 0) {
      endGame();
    }
  }, 1000);
}

// this is the function to get to end screen
function endGame() {
  document.getElementById("question").innerText = "All done!";
  document.getElementById("buttonsContainer").style.display = "none";
  document.getElementById("resultContainer").style.display = "none";

  clearInterval(timerIntervalId);
}
