document.addEventListener("DOMContentLoaded", function () {
  //DOMContentLoaded لا يعمل الكود الا عند تحميل الصفحة كاملة

  const registerForm = document.querySelector("form"); //تحديد form
  //   استدعاء كل عنصر بواسطة باليسألودر لاننا لم نعطي كل واحد منها كلاس خاص فيها
  const fullNameInput = registerForm.querySelector(
    'input[placeholder="Enter your name"]'
  );
  const usernameInput = registerForm.querySelector(
    'input[placeholder="Enter your username"]'
  );
  const emailInput = registerForm.querySelector(
    'input[placeholder="Enter your email"]'
  );
  const phoneInput = registerForm.querySelector(
    'input[placeholder="Enter your phone number"]'
  );
  const passwordInput = registerForm.querySelector(
    'input[placeholder="Enter your password"]'
  );
  const confirmPasswordInput = registerForm.querySelector(
    'input[placeholder="Confirm your password"]'
  );

  const genderMale = document.getElementById("dot-1");
  const genderFemale = document.getElementById("dot-2");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault(); // يمنع ارسال النموذج في حالات معينة نحن نحددها
    // وضعنا كل القيمة في متغيررات لنتحكم فيها وايضا بالصفحة

    const fullName = fullNameInput.value.trim();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    // نحتفظ ب مال اذا اختارها و نحتفظ ب فمال اذا اختارها اذا لم يختار شيئ اختحظ ب فارغ لا شئ
    const gender = genderMale.checked
      ? "Male"
      : genderFemale.checked
      ? "Female"
      : "";
    // شكل تاني للكود اذا ما فهمتي الفوق
    //  let gender = "";
    // if (genderMale.checked) {
    //   gender = "Male";
    // } else if (genderFemale.checked) {
    //   gender = "Female";
    // } else {
    //   gender = "";
    // }
    // التحقق من كلمة المرور
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // اذا كان المستخدم ترك احدى الحقول فارغة يعطي هذه الرسالة
    if (!fullName || !username || !email || !phone || !password || !gender) {
      alert("Please fill in all fields.");
      return;
    }
    // hun scren yahniyatla aktar shi shft 3yonik  l hlwin l yum ya retnu l scrennnn t3tik
    // JSON.parse بس بدنا نجيب اي شي من لوكال لازم تعملي هي لان هني على شكل تجيسون لازم نحولن ل نص عادي
    // hun  am elu yaani rpuh shuf hal email majoud bl local iz ma amwjoud redli arrat fadi
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // hun am eli brom b kel yali jbtun fi shi whd metl yali da5alo l users laan mafina hada yida5l two email metl ba3d
    //function some bnsta3mala la nkarin shi ma3 array
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      // hun am elu iza le2t tnen metl b3ed elu lal user yi8ar l email
      alert("Email is already registered.");
      return;
    }
    // hun ya hala am elo enu hut kl l information yali hatun l user b array we bi alb const

    // بس توصلي لهون حكيني لابتعلك صوت
    const newUser = {
      fullName,
      username,
      email,
      phone,
      password,
      gender,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    if (email === "admin@quiz.com" && password === "admin123") {
      window.location.href = "dashboard.html";
      return;
    }
    sessionStorage.setItem("loggedInUser", JSON.stringify(newUser));
    //iza zabt kl shi fo2 5dni al home
    window.location.href = "../home/home.html";
    // hun scren yahniyatla aktar shi shft 3yonik  l hlwin l yum ya retnu l scrennnn t3tik
  });
});
