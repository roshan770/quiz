// select all elements

const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const total = document.getElementById("total");
const btn = document.getElementById("btn");

// create our questions

let questions = [
  {
    question: "1. The mother board contains various_______. ",
    imgSrc: "img/a.jpg",
    choiceA: "Integrated system",
    choiceB: "Integrated Circuits",
    choiceC: "Integrated Science",
    choiceD: "algorithm-based",
    correct: "B"
  },
  {
    question: "2. A proxy server is used for which of the following?",
    imgSrc: "img/b.jpg",
    choiceA: "To provide security against unauthorised users",
    choiceB: "To process client requests for web pages",
    choiceC: "To process client requests for database access",
    choiceD: "To provide TCP/IP",
    correct: "B"
  },
  {
    question:
      "3. __________Is a mechanism by which all the content in a specified storage areas are written as output.",
    imgSrc: "img/c.jpg",
    choiceA: "Scheduling",
    choiceB: "Logging",
    choiceC: "Chumping",
    choiceD: "Dumping",
    correct: "D"
  },
  {
    question:
      "4. A process known as ____________ is used by large retailers to study trends.",
    imgSrc: "img/d.png",
    choiceA: "Data mining",
    choiceB: "POS(Point of Sale)",
    choiceC: "Data selection",
    choiceD: "Data conversion",
    correct: "A"
  },
  {
    question:
      "5. ______ Is the execution of at least two different programs simultaneously,",
    imgSrc: "img/e.jpg",
    choiceA: " Multiprocessing",
    choiceB: "Multi programming",
    choiceC: "Recovery",
    choiceD: "Integrity",
    correct: "A"
  }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

// counter render

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    count = 0;
    // change progress color to red
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

// checkAnwer

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score++;
    // change progress color to green
    answerIsCorrect();
  } else {
    // answer is wrong
    // change progress color to red
    answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}

// answer is correct
function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
  scoreDiv.style.display = "block";
  total.style.display = "block";

  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round((100 * score) / questions.length);
  const totalScore = Math.round(score);

  // choose the image based on the scorePerCent
  let img =
    scorePerCent >= 80
      ? "img/5.png"
      : scorePerCent >= 60
      ? "img/4.png"
      : scorePerCent >= 40
      ? "img/3.png"
      : scorePerCent >= 20
      ? "img/2.png"
      : "img/1.png";

  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";

  total.innerHTML = "<p> Total=" + totalScore + "</p>";
}
function btnn() {
  location.reload();
}
