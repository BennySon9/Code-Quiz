let questionNumber = 1; // this should never change
let timer = 75; //this is the starting score/timer
let timerIntervalId = -1;

let questions = [
  {
    text: "Commonly used data types DO Not include:",
    correctAnswer: 3,
    answer1Text: "1. strings",
    answer2Text: "2. booleans",
    answer3Text: "3. alerts",
    answer4Text: "4. numbers",
  },
  {
    text: "The condition in an if / else statement is enclosed with ____.",
    correctAnswer: 2,
    answer1Text: "1. quotes",
    answer2Text: "2. curly brackets",
    answer3Text: "3. parenthesis",
    answer4Text: "4. square brackets",
  },
  {
    text: "Arrays in JavaScript can be used to store __.",
    correctAnswer: 4,
    answer1Text: "1. numbers and strings",
    answer2Text: "2. other arrays",
    answer3Text: "3. booleans",
    answer4Text: "4. all of the above",
  },
  {
    text: "String values must be enclosed within ____ when being assigned to variables.",
    correctAnswer: 3,
    answer1Text: "1. commas",
    answer2Text: "2. curly brackets",
    answer3Text: "3. quotes",
    answer4Text: "4. parenthesis",
  },
  {
    text: "A very useful tool used during development and debugging for printing content to the debugger is:",
    correctAnswer: 4,
    answer1Text: "1. JavaScript",
    answer2Text: "2. terminal/bash",
    answer3Text: "3. for loops",
    answer4Text: "4. console.log",
  },
];

function startQuiz() {
  //start timer to decrement every second
  //display the content
  document.getElementById("content").style.display = "block";
  document.getElementById("startButton").style.display = "none";
  document.getElementById("title").style.display = "none";
  document.getElementById("info").style.display = "none";

  timerIntervalId = setInterval(() => {
    timer--;
    document.getElementById("time").innerText = timer;

    //end game case
    if (timer <= 0) {
      endGame();
    }
  }, 1000);
}

//this is the function to get to end screen
function endGame() {
  document.getElementById("question").innerText = "All done!";
  document.getElementById("buttonsContainer").style.display = "none";
  document.getElementById("endContainer").style.display = "block";
  //load the score
  document.getElementById("score").innerText =
    "Your final score is " + timer + ".";
  clearInterval(timerIntervalId);
}

//when a button is clicked for a question answer
function answer(answerNumber) {
  const isOutOfTime = decideResult(answerNumber); //true or false

  if (isOutOfTime) {
    //do something
  } else {
    if (questionNumber < questions.length) {
      navigateToNextQuestion();
    } else {
      //the last answer has been submitted
      //end the game

      endGame();
    }
  }
}

//Subtract from timer if wrong ..
//Change the html of the result ..
//returns whether or not the game is over due to lack of time
function decideResult(answerNumber) {
  if (questions[questionNumber - 1].correctAnswer != answerNumber) {
    //incorrect answer
    timer -= 10;

    document.getElementById("result").innerText = "Wrong!";

    document.getElementById("time").innerText = timer;

    if (timer <= 0) {
      return true; // game is over, because of no more time
    }
  } else {
    //correct answer
    document.getElementById("result").innerText = "Correct!";
  }

  return false; // game continues, time is still good
}

function navigateToNextQuestion() {
  questionNumber++;

  const question = questions[questionNumber - 1];

  const questionText = question.text;

  //set question text
  document.getElementById("question").innerText = questionText;

  //set button text
  document.getElementById("answer1").innerText = question.answer1Text;
  document.getElementById("answer2").innerText = question.answer2Text;
  document.getElementById("answer3").innerText = question.answer3Text;
  document.getElementById("answer4").innerText = question.answer4Text;
}

//
function submitScore() {
  //save to local storage
  //redirect to scores.html
  const name = document.getElementById("input").value;

  if (name.length <= 0) {
    console.log("No name was entered.");
    return;
  }

  //name is the key,
  //and the timer score is the value of the item inserted into localStorage
  window.localStorage.setItem(name, timer);
  console.log(`User ${name} has saved a score of ${timer}`);

  //this redirect might need improvement....
  //the local storage isn't saving between the pages on the same domain
  window.location.href = "./highscores.html";
}

//load in the values for question 1 and timer
document.getElementById("time").innerText = "0";
document.getElementById("question").innerText = questions[0].text;
document.getElementById("answer1").innerText = questions[0].answer1Text;
document.getElementById("answer2").innerText = questions[0].answer2Text;
document.getElementById("answer3").innerText = questions[0].answer3Text;
document.getElementById("answer4").innerText = questions[0].answer4Text;
