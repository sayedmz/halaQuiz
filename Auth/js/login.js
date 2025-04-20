document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");
  const emailInput = document.querySelector("input[type='email']");
  const passwordInput = document.querySelector("input[type='password']");
  // hun scren yahniyatla aktar shi shft wjik l hlu l yum ya retnu l scrennnn t3tik
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // hun ya set hala am jib yali da5lun users kerml ne3ml mokarani
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // hyda l email hewi 3atana yeh we elna enu iza hda l email hewi mawjoud 7awlni al dash
    // ma 3arfin enu enti admin l jamal
    if (email === "admin@quiz.com" && password === "admin123") {
      window.location.href = "../dashoard/dashboard.html";
      return;
    }

    // hun am jib l information mn local yali semaytun users bi hidik l page iza mala2a shi berdli fadi
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // hun am elo fut al users we 3tayna esm e we eltlo fut al kl wehd e3ml search we shfli iza fi metl yali da5alo user
    const user = users.find((e) => e.email === email);

    // hun ya hlwi am elo enu shuf user iza mshi halo we shuf l pass iza metl yali bl local
    if (user && user.password === password) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      // 7awlni al dash
      window.location.href = "../home/home.html";
    } else {
      // iza laa 3tini rsli
      alert("Invalid email or password. Please try again.");
    }
  });
  // hun scren yahniyatla aktar shi shft wjik l hlu l yum ya retnu l scrennnn t3tik
});
