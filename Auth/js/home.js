document.addEventListener("DOMContentLoaded", function () {
  const messageDiv = document.querySelector(".message");
  const quizButton = document.querySelector(".btn1");
  const logoutButton = document.querySelector(".logout-btn");

  // bnjib l info mn session yali nhna hfazneha mn abel
  const user = sessionStorage.getItem("loggedInUser");
  console.log("user", user);
  // bda nshuf iza mawjod aw la
  if (user) {
    // iza kn mawjoud 3mli hul sha8let

    const fullName = JSON.parse(user).fullName; // hyda bs tosali 3lh hkini

    const welcomeMessage = `hello ${fullName} in HalaQuiz l hlwi we amira we yali ma fi nema bl deni klaaaaaa we yali bda tsir ahla dc nashallah`;
    messageDiv.textContent = welcomeMessage;
    messageDiv.style.fontSize = "20px";
    messageDiv.style.fontWeight = "bold";
    messageDiv.style.color = "#7880F6";
    messageDiv.style.textAlign = "center";
    messageDiv.style.marginBottom = "20px";
    quizButton.style.display = "inline-block"; // إظهار الزر "quiz"
    logoutButton.style.display = "inline-block"; // إظهار زر "logout"
  } else {
    // iza l user ma kn mawjoud eml hul shaglet
    quizButton.style.display = "none";
    logoutButton.style.display = "none";
  }

  logoutButton.addEventListener("click", function () {
    // btrouh bt3ml delet lal sesseion
    sessionStorage.removeItem("loggedInUser");

    //we bt3mol hul shaglet kerml hala tkun mbsota
    messageDiv.textContent = "";
    quizButton.style.display = "none";
    logoutButton.style.display = "none";

    window.location.href = "../login/login.html";
  });
});
