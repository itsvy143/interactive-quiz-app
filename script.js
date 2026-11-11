// ========================================
// 1. QUIZ QUESTIONS
// ========================================

const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyper Transfer Machine Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "Which language is used to style web pages?",
    answers: ["Python", "CSS", "Java", "SQL"],
    correctAnswer: "CSS",
  },
  {
    question: "Which language adds interactivity to websites?",
    answers: ["HTML", "CSS", "JavaScript", "PHP"],
    correctAnswer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    question: "Which HTML tag creates a hyperlink?",
    answers: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: "<a>",
  },
  {
    question: "Which symbol is used for a single-line comment in JavaScript?",
    answers: ["<!-- -->", "##", "//", "**"],
    correctAnswer: "//",
  },
  {
    question: "Which method selects an HTML element by its ID?",
    answers: [
      "document.getElementById()",
      "document.getClass()",
      "document.querySelectorAllId()",
      "document.findElement()",
    ],
    correctAnswer: "document.getElementById()",
  },
  {
    question: "Which HTML element is used to display an image?",
    answers: ["<picture>", "<image>", "<img>", "<src>"],
    correctAnswer: "<img>",
  },
  {
    question: "Which keyword declares a variable that can be reassigned?",
    answers: ["const", "let", "static", "fixed"],
    correctAnswer: "let",
  },
  {
    question: "What does SQL stand for?",
    answers: [
      "Structured Query Language",
      "Simple Question Language",
      "System Query Logic",
      "Sequential Question List",
    ],
    correctAnswer: "Structured Query Language",
  },
];

// ========================================
// 2. GET HTML ELEMENTS
// ========================================

const questionCounter = document.getElementById("question-counter");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");

const quizContent = document.getElementById("quiz-content");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");

const resultContainer = document.getElementById("result-container");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");

// ========================================
// 3. QUIZ VARIABLES
// ========================================

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

// ========================================
// 4. SHUFFLE ANSWER CHOICES
// ========================================

function shuffleAnswers(answers) {
  const shuffledAnswers = [...answers];

  for (let i = shuffledAnswers.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffledAnswers[i], shuffledAnswers[randomIndex]] = [
      shuffledAnswers[randomIndex],
      shuffledAnswers[i],
    ];
  }

  return shuffledAnswers;
}

// ========================================
// 5. DISPLAY QUESTION
// ========================================

function displayQuestion() {
  answerSelected = false;

  const currentQuestion = questions[currentQuestionIndex];

  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  scoreDisplay.textContent = `Score: ${score}`;

  questionElement.textContent = currentQuestion.question;

  answerButtons.innerHTML = "";
  feedbackElement.textContent = "";
  feedbackElement.className = "";

  nextButton.disabled = true;

  const shuffledAnswers = shuffleAnswers(currentQuestion.answers);

  shuffledAnswers.forEach(function (answer) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-button";
    button.textContent = answer;

    button.addEventListener("click", function () {
      selectAnswer(button, answer, currentQuestion.correctAnswer);
    });

    answerButtons.appendChild(button);
  });

  updateProgress();
}

// ========================================
// 6. SELECT ANSWER
// ========================================

function selectAnswer(selectedButton, selectedAnswer, correctAnswer) {
  if (answerSelected) {
    return;
  }

  answerSelected = true;

  const allButtons = answerButtons.querySelectorAll(".answer-button");

  allButtons.forEach(function (button) {
    button.disabled = true;

    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    }
  });

  if (selectedAnswer === correctAnswer) {
    score++;

    feedbackElement.textContent = "Correct! Well done!";
    feedbackElement.className = "feedback-correct";
  } else {
    selectedButton.classList.add("incorrect");

    feedbackElement.textContent = `Incorrect! The correct answer is ${correctAnswer}.`;
    feedbackElement.className = "feedback-incorrect";
  }

  scoreDisplay.textContent = `Score: ${score}`;

  nextButton.disabled = false;
}

// ========================================
// 7. UPDATE PROGRESS BAR
// ========================================

function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  progressBar.style.width = `${progress}%`;
}

// ========================================
// 8. MOVE TO NEXT QUESTION
// ========================================

nextButton.addEventListener("click", function () {
  if (!answerSelected) {
    return;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    displayResults();
  }
});

// ========================================
// 9. DISPLAY FINAL RESULTS
// ========================================

function displayResults() {
  quizContent.hidden = true;
  resultContainer.hidden = false;

  finalScore.textContent = `Your Score: ${score} / ${questions.length}`;

  const percentage = (score / questions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect score! Excellent work!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your IT fundamentals!";
  } else if (percentage >= 50) {
    resultMessage.textContent = "Good effort! Keep practicing!";
  } else {
    resultMessage.textContent = "Keep learning! You can do better next time!";
  }

  questionCounter.textContent = "Quiz Completed";
  scoreDisplay.textContent = `Final Score: ${score}`;
  progressBar.style.width = "100%";
}

// ========================================
// 10. RESTART QUIZ
// ========================================

restartButton.addEventListener("click", function () {
  currentQuestionIndex = 0;
  score = 0;
  answerSelected = false;

  quizContent.hidden = false;
  resultContainer.hidden = true;

  displayQuestion();
});

// ========================================
// 11. START QUIZ
// ========================================

displayQuestion();
