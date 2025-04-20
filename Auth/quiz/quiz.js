window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");

  if (window.scrollY > 50) {
    //lh>50 yaeni bs aeml scroll ytghyr lwna baed msfeh 50px

    nav.style.backgroundColor = "#2e3267";
  } else {
    nav.style.backgroundColor = "transparent";
  }
});

$(document).ready(function () {
  $(".btn-primary").click(function () {
    $(".popup-info").show();
    $(".quiz").css({
      filter: "blur(15px)",
    });
  });

  $(".exit").click(function () {
    $(".popup-info").hide();
    $(".quiz").css({
      filter: "none",
    });
  });
  $(".continue").click(function () {
    $(".quiz").fadeOut();
    $(".popup-info").fadeOut();
    $(".containe").fadeIn().addClass("show");
    $("nav").css({
      display: "none",
    });
  });
});
var score = 0;
var currentQuestion = 0;
var option = document.querySelectorAll(".option");
var nextButton = document.querySelector(".next-btn");
var scores = document.querySelector(".score");
var questionntext = document.querySelector(".question-text");
var questotal = document.querySelector(".question-total");
var resulta = document.querySelector(".score-text");
var questions = [
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
    question: "What does CSS stand for?",
    options: [
      { text: "A. Computer Style Sheets", correct: false },
      { text: "B. Cascading Style Sheets", correct: true },
      { text: "C. Creative Style Sheets", correct: false },
      { text: "D. Colorful Style Sheets", correct: false },
    ],
  },
  {
    question: "How do you declare a variable in JavaScript?",
    options: [
      { text: "A. var x;", correct: true },
      { text: "B. let x;", correct: true },
      { text: "C. const x;", correct: true },
      { text: "D. All of the above", correct: true },
    ],
  },
  {
    question: "What will the following code output? console.log(5 + '5');",
    options: [
      { text: "A. 10", correct: false },
      { text: "B. 55", correct: true },
      { text: "C. NaN", correct: false },
      { text: "D. Error", correct: false },
    ],
  },
  {
    question:
      "Which of the following is the correct syntax to link an external CSS file in an HTML document?",
    options: [
      { text: "A. <link src='styles.css' />", correct: false },
      { text: "B. <link href='styles.css' rel='stylesheet' />", correct: true },
      { text: "C. <css href='styles.css' />", correct: false },
      { text: "D. <style src='styles.css' />", correct: false },
    ],
  },
];

nextButton.addEventListener("click", function () {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    load(currentQuestion);

    //=======================================================

    let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    let quizResults = JSON.parse(localStorage.getItem("quizResults")) || [];

    let resultData = {
      fullName: loggedInUser.fullName,
      username: loggedInUser.username,
      email: loggedInUser.email,
      phone: loggedInUser.phone,
      gender: loggedInUser.gender,
      score: score,
      total: questions.length,
    };

    // تحقق إذا كان هالمستخدم عنده نتيجة سابقة، وحدثها
    let existingIndex = quizResults.findIndex(
      (r) => r.email === resultData.email
    );

    if (existingIndex !== -1) {
      quizResults[existingIndex] = resultData;
    } else {
      quizResults.push(resultData);
    }

    localStorage.setItem("quizResults", JSON.stringify(quizResults));

    //============================================================
  } else {
    var page = document.querySelector(".quiz-box");
    page.style.display = "none";
    var resul = document.querySelector(".result-box");
    resul.style.display = "block";
    resulta.innerHTML = " Your score " + score + " out  of " + questions.length;
  }
});

function load(index) {
  var current = questions[index];
  questionntext.innerHTML = current.question;

  for (var i = 0; i < option.length; i++) {
    option[i].setAttribute("data-correct", current.options[i].correct);
    option[i].querySelector("span").textContent = current.options[i].text;
    option[i].classList.remove("correct", "incorrect");
  }

  for (var i = 0; i < option.length; i++) {
    option[i].style.pointerEvents = "auto";
  }
  nextButton.disabled = true; //mn atlu ma fina nfeos elh

  questotal.innerHTML = index + 1 + " of " + questions.lentgh + " Question ";
}

for (var i = 0; i < option.length; i++) {
  option[i].addEventListener("click", function () {
    stop();
    var isCorrect = this.getAttribute("data-correct") === "true";

    if (!isCorrect) {
      this.classList.add("incorrect");
    } else {
      this.classList.add("correct");
      score++;
    }

    updateScore();
    nextButton.disabled = false; //bisir chghal fina nfeos elh
  });
}

function updateScore() {
  scores.innerHTML = score;
}

function stop() {
  for (var i = 0; i < option.length; i++) {
    option[i].style.pointerEvents = "none";
  }
}

document.querySelector(".try").addEventListener("click", function () {
  var page = document.querySelector(".quiz-box");
  page.style.display = "block";
  var resul = document.querySelector(".result-box");
  resul.style.display = "none";
  currentQuestion = 0;
  load(currentQuestion);
  score = 0;
  updateScore();
});
