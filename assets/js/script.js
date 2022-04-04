// Element definition for further use
let questionElement = document.querySelector("#main-text-container");
let answerButtonEl = document.querySelector("#answer-buttons");
let secondaryText = document.querySelector("#secondary-text");
let answerSurprise = document.querySelector("#answer-text-container");
let answerSubmitEl = document.querySelector("#submit-container");
let highscoreSubmitEl = document.querySelector("#hs-container");
// Buttons
const startButton = document.querySelector("#start-btn");
let hsPanel = document.querySelector("#highscore-panel");
let backButton = document.querySelector("#back-btn");
let clearButton = document.querySelector("#clear-hs-btn")
let submitButton = document.querySelector("#submit-btn");
// Quiz options
let option1 = document.querySelector("#btn-1");
let option2 = document.querySelector("#btn-2");
let option3 = document.querySelector("#btn-3");
let option4 = document.querySelector("#btn-4");
// Click events for the buttons
hsPanel.addEventListener("click", showHighscores);
backButton.addEventListener("click", startScreen)
clearButton.addEventListener("click", removeHs);
startButton.addEventListener("click", startGame);
// Global variables
let timerEl = document.querySelector("#timer");
let timeLeft = 60;
let currentQuestion = 0;
let score = 0;

const questions = [
  {
    question: "Commonly used data DO NOT include:",
    option: ["Booleans", "Text", "Numbers", "Arrays"],
    answer: "Booleans",
  },
  {
    question: "Arrays in JavaScript can be used to Store _______.",
    option: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "String values must be enclosed within _____ when being assigned to variables.",
    option: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
    answer: "Quotes",
  },
];
// Function to load the instructions screen
function startScreen() {
  window.location.reload();
};
// Once we click the start button, start the counter and set first question
function startGame() {
    countdown();
    startButton.classList.add("hide");
    secondaryText.classList.add("hide");
    answerButtonEl.classList.remove("hide");
    setNextQuestion();
};

function setNextQuestion() {
    showQuestion(questions[currentQuestion]);
};
// Call the current question array
function showQuestion(question) {
    // Set the question text in the "main" title
    questionElement.innerHTML = question.question;
    // Replace buttons text for the options
    option1.innerHTML = question.option[0];
    option2.innerHTML = question.option[1];
    option3.innerHTML = question.option[2];
    option4.innerHTML = question.option[3];
};
// To each answer button, add a function to a) select the correct/wrong answer and b) change question
option1.addEventListener("click", selectAnswer);
option2.addEventListener("click", selectAnswer);
option3.addEventListener("click", selectAnswer);
option4.addEventListener("click", selectAnswer);

function selectAnswer(e) {
  // Once we click, compare the targetted button inner html 
  const selectedAnswer = e.target.innerHTML;
// If there are more available questions...
if (questions.length > currentQuestion + 1) {
  // ...select the correct or wrong answer
  if (selectedAnswer == questions[currentQuestion].answer) {
    answerSurprise.innerHTML = "Correct!";
    answerSurprise.classList.remove("hide");
    setTimeout(function(){
      answerSurprise.classList.add("hide");
    }, 1000);
    //Increment the question count
    currentQuestion++;
    setNextQuestion();

  } else {
    answerSurprise.innerHTML = "Wrong!";
    answerSurprise.classList.remove("hide");
    setTimeout(function(){
      answerSurprise.classList.add("hide");
    }, 2000);
    timeLeft = timeLeft - 10;
    currentQuestion++;
    setNextQuestion();
  };
  // Define the score if we finish the test before the time runs out
} else {
  score = timeLeft;
  setHighscore();
};
};
// Go to the highscore section, where we can submit our initials
function setHighscore() {
  questionElement.innerHTML = "All Done!";
  answerButtonEl.classList.add("hide");
  secondaryText.classList.remove("hide");
  // Show the user final score
  secondaryText.innerHTML = "Your final score is " + score;
  answerSubmitEl.classList.remove("hide");
  timerEl.classList.add("hide");
  // Save the final score, it's saved here because the timer function keeps running
  localStorage.setItem("finalScore", score);
};

function showHighscores() {
  highscoreSubmitEl.classList.remove("hide");
  answerSubmitEl.classList.add("hide");
  questionElement.innerHTML = "Highscores";
  secondaryText.classList.add("hide");
  backButton.classList.remove("hide");
  clearButton.classList.remove("hide");
  startButton.classList.add("hide");

  // Retrieve the last score and append it to the page
  let highScore = localStorage.getItem("scoreRetrieve");
  // Create a list element
  const list = document.createElement("li");
  // Use it to show the last score
  list.textContent = highScore;
  // And append it to index
  highscoreSubmitEl.appendChild(list);
};

function removeHs() {
  // Remove saved scores from local storage
  localStorage.removeItem("scoreRetrieve");
  // And reset the previously appended childs
  while (highscoreSubmitEl.firstChild) {
    highscoreSubmitEl.removeChild
    (highscoreSubmitEl.firstChild);
  };
  showHighscores();
};
// Timer from. Score will be retrieved from here
function countdown() {
    let timeInterval = setInterval(function () {
      timerEl.textContent = "Time left: " + (timeLeft-1);
      timeLeft--;
      
      if (timeLeft === 0) {
        clearInterval(timeInterval);
        setHighscore();
        return;
      }
    }, 1000);
  };
// Submit button will save the score
submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  
  let initials = document.querySelector("#initials-submit").value;

  if (initials === "") {
    window.alert("Initials must be submitted");
  } else {
  // Here we retrieve the previously saved final score, independent of the still running time, we will get the score achieved at the very end of the test
    let scoreRegister = initials + " - " + localStorage.getItem("finalScore");

  localStorage.setItem("scoreRetrieve", scoreRegister);
  showHighscores();
  }
});