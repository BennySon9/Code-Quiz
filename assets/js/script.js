let questionNumber = 1; // this should never change
let timer = 75; //this is the starting score/timer
let timerIntervalId = -1;

let questions = [
  {
    text: "Question 1",
    correctAnswer: 2,
    answer1Text: "answer 1",
    answer2Text: "answer 2",
    answer3Text: "answer 3",
    answer4Text: "answer 4",
  },
  {
    text: "Question 2",
    correctAnswer: 3,
    answer1Text: "answer 1",
    answer2Text: "answer 2",
    answer3Text: "answer 3",
    answer4Text: "answer 4",
  },
  {
    text: "Question 3",
    correctAnswer: 1,
    answer1Text: "answer 1",
    answer2Text: "answer 2",
    answer3Text: "answer 3",
    answer4Text: "answer 4",
  },
  {
    text: "Question 4",
    correctAnswer: 3,
    answer1Text: "answer 1",
    answer2Text: "answer 2",
    answer3Text: "answer 3",
    answer4Text: "answer 4",
  },
];

function startQuiz() {
  //start timer to decrement every second
  //display the content
  document.getElementById("content").style.display = "block";
  document.getElementById("startButton").style.display = "none";
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
  document.getElementById("resultContainer").style.display = "none";
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
  window.location.href = "./scores.html";
}

//load in the values for question 1 and timer
document.getElementById("time").innerText = timer;
document.getElementById("question").innerText = questions[0].text;
document.getElementById("answer1").innerText = questions[0].answer1Text;
document.getElementById("answer2").innerText = questions[0].answer2Text;
document.getElementById("answer3").innerText = questions[0].answer3Text;
document.getElementById("answer4").innerText = questions[0].answer4Text;
