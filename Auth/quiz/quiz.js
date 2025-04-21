// --- Global Variables ---
let score = 0;
let currentQuestion = 0;
let selectedQuizIndex = -1; // Index of the chosen quiz (0: HTML, 1: CSS, 2: JS)

// --- DOM Elements ---
const quizSelectionArea = document.querySelector(".quiz-selection-area");
const quizCards = document.querySelectorAll(".quiz-card");
const startQuizBtns = document.querySelectorAll(".start-quiz-btn");
const popupInfo = document.querySelector(".popup-info");
const exitPopupBtn = document.querySelector(".exit");
const continuePopupBtn = document.querySelector(".continue");
const quizContainer = document.querySelector(".quiz-container"); // Renamed from .containe
const quizBox = document.querySelector(".quiz-box");
const quizTitle = document.getElementById("quiz-title"); // Title inside quiz box
const questionText = document.querySelector(".question-text");
const optionList = document.querySelector(".option-list"); // Container for options
const options = optionList.querySelectorAll(".option"); // Get options once
const nextButton = document.querySelector(".next-btn");
const scoreDisplay = document.querySelector(".score");
const totalQuestionsDisplay = document.querySelector(".total-questions"); // Span for total num
const questionTotalDisplay = document.querySelector(".question-total"); // e.g., "1 of 5 Question"
const resultBox = document.querySelector(".result-box");
const resultScoreText = document.querySelector(".score-text");
const tryAgainBtn = document.querySelector(".try");
const goToHomeBtn = document.querySelector(".gohome"); // Anchor tag contains the button
const mainNav = document.querySelector("nav");

// --- Questions Data ---
const allQuestions = [
  [
    // Quiz 0: HTML
    {
      question: "What does HTML stand for?",
      options: [
        { text: "A. Hyper Type Multi Language", correct: false },
        { text: "B. Hyper Text Multiple Language", correct: false },
        { text: "C. Hyper Text Markup Language", correct: true },
        { text: "D. Home Text Multi Language", correct: false },
      ],
    },
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: [
        { text: "A. <link>", correct: false },
        { text: "B. <a>", correct: true },
        { text: "C. <href>", correct: false },
        { text: "D. <url>", correct: false },
      ],
    },
    {
      question: "What is the correct HTML element for inserting a line break?",
      options: [
        { text: "A. <break>", correct: false },
        { text: "B. <lb>", correct: false },
        { text: "C. <br>", correct: true },
        { text: "D. <line>", correct: false },
      ],
    },
    {
      question: "Which tag is used to define an unordered list?",
      options: [
        { text: "A. <ul>", correct: true },
        { text: "B. <ol>", correct: false },
        { text: "C. <li>", correct: false },
        { text: "D. <list>", correct: false },
      ],
    },
    {
      question: "Which HTML attribute is used to define inline styles?",
      options: [
        { text: "A. style", correct: true },
        { text: "B. class", correct: false },
        { text: "C. font", correct: false },
        { text: "D. styles", correct: false },
      ],
    },
  ],
  [
    // Quiz 1: CSS
    {
      question:
        "What is the correct syntax to apply a background color in CSS?",
      options: [
        { text: "background-color: blue;", correct: true },
        { text: "bg-color: blue;", correct: false },
        { text: "color-background: blue;", correct: false },
        { text: "background:color blue;", correct: false },
      ],
    },
    {
      question: "Which property controls the text size?",
      options: [
        { text: "font-style", correct: false },
        { text: "text-size", correct: false },
        { text: "font-size", correct: true },
        { text: "size-text", correct: false },
      ],
    },
    {
      question: "How do you select all <p> elements inside a <div>?",
      options: [
        { text: "div + p", correct: false },
        { text: "div > p", correct: false },
        { text: "div p", correct: true },
        { text: "p div", correct: false },
      ],
    },
    {
      question: "Which CSS property makes text bold?",
      options: [
        { text: "font-weight: bold;", correct: true },
        { text: "text-style: bold;", correct: false },
        { text: "bold: true;", correct: false },
        { text: "font: bold;", correct: false },
      ],
    },
    {
      question: "What does the z-index property control?",
      options: [
        { text: "Text alignment", correct: false },
        { text: "Layer order", correct: true },
        { text: "Font thickness", correct: false },
        { text: "Screen zoom", correct: false },
      ],
    },
  ],
  [
    // Quiz 2: JavaScript
    {
      question: "Which of these is a JavaScript data type?",
      options: [
        { text: "Number", correct: true },
        { text: "Style", correct: false },
        { text: "Font", correct: false },
        { text: "Heading", correct: false },
      ],
    },
    {
      // Modified Q2 for JS: Include both comment types as correct options
      question: "How do you write a single-line comment in JavaScript?",
      options: [
        { text: "// This is a comment", correct: true },
        { text: "/* This is a comment */", correct: false }, // Typically multiline
        { text: "# This is a comment", correct: false },
        { text: "<!-- This is a comment -->", correct: false },
      ],
    },
    {
      // Added a question about block comments
      question: "How do you write a multi-line comment in JavaScript?",
      options: [
        { text: "// This is a comment //", correct: false },
        { text: "/* This is a comment */", correct: true },
        { text: "/** This is a comment **/", correct: true }, // JSDoc style also valid
        { text: "<-- This is a comment -->", correct: false },
      ],
    },
    {
      question: "Which keyword is used to define a constant?",
      options: [
        { text: "const", correct: true },
        { text: "let", correct: false },
        { text: "var", correct: false },
        { text: "define", correct: false },
      ],
    },
    {
      question: "What will typeof null return?",
      options: [
        { text: "'object'", correct: true }, // This is a known quirk in JS
        { text: "'null'", correct: false },
        { text: "'undefined'", correct: false },
        { text: "'boolean'", correct: false },
      ],
    },
    {
      question: "Which operator checks both value and type?",
      options: [
        { text: "==", correct: false },
        { text: "===", correct: true },
        { text: "=", correct: false },
        { text: "!=", correct: false },
      ],
    },
  ],
];

// --- Functions ---

// Function to load a specific question
function loadQuestion(quizIndex, questionIndex) {
  const currentQuiz = allQuestions[quizIndex];
  const questionData = currentQuiz[questionIndex];

  // Update quiz title (only once needed, maybe move to startQuiz)
  // quizTitle.textContent = `${['HTML', 'CSS', 'JavaScript'][quizIndex]} Quiz`;

  questionText.textContent = questionData.question;
  questionTotalDisplay.textContent = `${questionIndex + 1} of ${
    currentQuiz.length
  } Questions`;
  totalQuestionsDisplay.textContent = currentQuiz.length; // Update total in header

  // Populate options
  options.forEach((option, i) => {
    const optionData = questionData.options[i];
    if (optionData) {
      option.querySelector("span").textContent = optionData.text;
      option.setAttribute("data-correct", optionData.correct);
      option.style.display = "block"; // Ensure option is visible
    } else {
      option.style.display = "none"; // Hide unused option divs if < 4 options
    }
    // Reset styles and enable clicking
    option.classList.remove("correct", "incorrect", "disabled");
    option.style.pointerEvents = "auto";
  });

  nextButton.disabled = true; // Disable next button until an option is selected
}

// Function to handle option click
function handleOptionClick() {
  if (this.classList.contains("disabled")) return; // Prevent clicking after selection

  const isCorrect = this.getAttribute("data-correct") === "true";
  const currentQuiz = allQuestions[selectedQuizIndex];

  // Disable all options after one is clicked
  options.forEach((opt) => {
    opt.style.pointerEvents = "none"; // Disable further clicks
    opt.classList.add("disabled"); // Add class for visual feedback if needed
  });

  if (isCorrect) {
    this.classList.add("correct");
    score++;
    updateScore();
  } else {
    this.classList.add("incorrect");
    // Optionally highlight the correct answer
    options.forEach((opt) => {
      if (opt.getAttribute("data-correct") === "true") {
        opt.classList.add("correct");
      }
    });
  }

  nextButton.disabled = false; // Enable the next button
}

// Function to update the displayed score
function updateScore() {
  scoreDisplay.textContent = score;
}

// Function to save results to localStorage
function saveResult() {
  let loggedInUser = null;
  try {
    loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  } catch (e) {
    console.error("Error parsing loggedInUser from sessionStorage:", e);
  }

  if (loggedInUser && loggedInUser.email) {
    // Check if user exists and has email
    let quizResults = [];
    try {
      quizResults = JSON.parse(localStorage.getItem("quizResults")) || [];
    } catch (e) {
      console.error("Error parsing quizResults from localStorage:", e);
      quizResults = []; // Reset if corrupted
    }

    let resultData = {
      // Ensure all fields exist on loggedInUser or provide defaults
      fullName: loggedInUser.fullName || "N/A",
      username: loggedInUser.username || "N/A",
      email: loggedInUser.email,
      phone: loggedInUser.phone || "N/A",
      gender: loggedInUser.gender || "N/A",
      quizType: ["HTML", "CSS", "JavaScript"][selectedQuizIndex], // Store quiz type
      score: score,
      total: allQuestions[selectedQuizIndex].length,
      timestamp: new Date().toISOString(), // Add timestamp
    };

    // Find if a result for this specific user and quiz type exists
    let existingIndex = quizResults.findIndex(
      (r) => r.email === resultData.email && r.quizType === resultData.quizType
    );

    if (existingIndex !== -1) {
      // Update only if the new score is higher, or just update always
      // quizResults[existingIndex] = resultData; // Always update
      if (resultData.score >= quizResults[existingIndex].score) {
        quizResults[existingIndex] = resultData; // Update if score is higher or equal
      }
    } else {
      quizResults.push(resultData);
    }

    try {
      localStorage.setItem("quizResults", JSON.stringify(quizResults));
    } catch (e) {
      console.error("Error saving quizResults to localStorage:", e);
    }
  } else {
    console.warn("User not logged in or email missing, cannot save results.");
    // Optionally inform the user results won't be saved
    // alert("You are not logged in. Your quiz results will not be saved.");
  }
}

// Function to start a specific quiz
function startQuiz() {
  score = 0;
  currentQuestion = 0;
  updateScore();

  // Set Quiz Title
  const quizName = ["HTML", "CSS", "JavaScript"][selectedQuizIndex];
  quizTitle.textContent = `${quizName} Quiz`;

  quizSelectionArea.style.display = "none"; // Hide selection screen
  popupInfo.style.display = "none"; // Hide popup
  quizContainer.classList.add("show"); // Show quiz area
  resultBox.classList.remove("show"); // Ensure result box is hidden
  mainNav.style.display = "none"; // Hide nav during quiz

  loadQuestion(selectedQuizIndex, currentQuestion);
}

// --- Event Listeners ---

// 1. Start Quiz Buttons on Cards
startQuizBtns.forEach((button) => {
  button.addEventListener("click", () => {
    selectedQuizIndex = parseInt(
      button.closest(".quiz-card").getAttribute("data-quiz-index")
    );
    popupInfo.style.display = "block"; // Show the guide popup
    quizSelectionArea.classList.add("blur-background"); // Blur the background
  });
});

// 2. Exit button in Popup
exitPopupBtn.addEventListener("click", () => {
  popupInfo.style.display = "none";
  quizSelectionArea.classList.remove("blur-background"); // Remove blur
  selectedQuizIndex = -1; // Reset selection
});

// 3. Continue button in Popup
continuePopupBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default anchor behavior
  startQuiz();
  quizSelectionArea.classList.remove("blur-background"); // Remove blur
});

// 4. Option Click Handler (Attaching once)
options.forEach((option) => {
  option.addEventListener("click", handleOptionClick);
});

// 5. Next Button Click
nextButton.addEventListener("click", () => {
  currentQuestion++;
  const currentQuiz = allQuestions[selectedQuizIndex];

  if (currentQuestion < currentQuiz.length) {
    loadQuestion(selectedQuizIndex, currentQuestion);
  } else {
    // Quiz finished
    quizContainer.classList.remove("show"); // Hide quiz box area
    resultBox.classList.add("show"); // Show result box
    resultScoreText.textContent = `Your score ${score} out of ${currentQuiz.length}`;
    saveResult(); // Save result to localStorage
  }
});

// 6. Try Again Button Click
tryAgainBtn.addEventListener("click", () => {
  resultBox.classList.remove("show"); // Hide results
  // Restart the *same* quiz
  startQuiz();
});

// 7. Go To Home Button (in results) - Assumes it's inside the <a> tag
// No specific JS needed if the <a> tag has href="quiz.html".
// However, let's ensure the nav is visible again when going back.
const goHomeLink = document.querySelector(".gohome").closest("a");
if (goHomeLink) {
  goHomeLink.addEventListener("click", () => {
    mainNav.style.display = "block"; // Or "" to reset to default CSS
    quizContainer.classList.remove("show");
    resultBox.classList.remove("show");
    quizSelectionArea.style.display = "flex"; // Or "block" depending on CSS
    // Reset state if needed
    selectedQuizIndex = -1;
    score = 0;
    currentQuestion = 0;
  });
}

// 8. Nav Scroll Effect (Keep as is)
window.addEventListener("scroll", function () {
  if (mainNav.style.display !== "none") {
    // Only apply if nav is visible
    if (window.scrollY > 50) {
      mainNav.style.backgroundColor = "rgba(15, 30, 45, 0.9)"; // Use original color
    } else {
      mainNav.style.backgroundColor = "rgba(15, 30, 45, 0.9)"; // Keep it consistent or transparent if preferred
    }
  }
});

// --- Initial Setup ---
function initializePage() {
  quizSelectionArea.style.display = "flex"; // Show selection on load
  quizContainer.classList.remove("show"); // Ensure quiz is hidden
  resultBox.classList.remove("show"); // Ensure results are hidden
  popupInfo.style.display = "none"; // Ensure popup is hidden
  mainNav.style.display = "block"; // Ensure nav is visible
  mainNav.style.backgroundColor = "rgba(15, 30, 45, 0.9)"; // Initial nav bg
  console.log("Quiz page initialized.");
}

// Run initialization when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializePage);
