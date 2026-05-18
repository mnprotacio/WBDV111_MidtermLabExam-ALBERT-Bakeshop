document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("inquiryForm");
  const button = document.getElementById("submitBtn");
  const status = document.getElementById("statusMessage");

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  // CONDITIONAL DATE & TIME
  const dateGroup = document.getElementById("dateGroup");
  const timeGroup = document.getElementById("timeGroup");

  const preferredDate = document.getElementById("preferredDate");
  const preferredTime = document.getElementById("preferredTime");

  // =============================
  // NAME: letters only
  // =============================
  name.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
    name.setCustomValidity("");
  });

  name.oninvalid = () => {
    if (name.value.trim() === "") {
      name.setCustomValidity("Please fill this field.");
    } else {
      name.setCustomValidity("Name must contain letters only.");
    }
  };

  // =============================
  // PHONE FORMAT
  // 09XX-XXX-XXXX
  // =============================
  phone.addEventListener("input", function () {

    let numbers = this.value.replace(/[^0-9]/g, "");

    if (numbers.length > 0 && !numbers.startsWith("09")) {
      numbers = "09" + numbers.replace(/^0+/, "");
    }

    numbers = numbers.slice(0, 11);

    let formatted = "";

    if (numbers.length > 0)
      formatted = numbers.substring(0, 4);

    if (numbers.length >= 5)
      formatted += "-" + numbers.substring(4, 7);

    if (numbers.length >= 8)
      formatted += "-" + numbers.substring(7, 11);

    this.value = formatted;

    phone.setCustomValidity("");
  });

  phone.oninvalid = () => {
    if (phone.value.trim() === "") {
      phone.setCustomValidity("Please fill this field.");
    } else {
      phone.setCustomValidity("Please enter a valid phone number.");
    }
  };

  // =============================
  // EMAIL VALIDATION
  // =============================
  email.oninvalid = () => {

    if (email.value.trim() === "") {
      email.setCustomValidity("Please complete this field");
    } else {
      email.setCustomValidity("Please include a valid email address.");
    }

  };

  // =============================
  // SUBJECT VALIDATION
  // =============================
  subject.oninvalid = () =>
    subject.setCustomValidity("Please select a subject.");

  // =============================
  // MESSAGE VALIDATION
  // =============================
  message.oninvalid = () =>
    message.setCustomValidity("Please complete this field");

  // =============================
  // DATE & TIME SHOW/HIDE
  // =============================
  const today = new Date().toISOString().split("T")[0];
  preferredDate.min = today;

  subject.addEventListener("change", function () {

    subject.setCustomValidity("");

    if (
      subject.value === "Customized Cakes" ||
      subject.value === "Reservations"
    ) {

      dateGroup.style.display = "flex";
      timeGroup.style.display = "flex";

      preferredDate.required = true;
      preferredTime.required = true;

    } else {

      dateGroup.style.display = "none";
      timeGroup.style.display = "none";

      preferredDate.required = false;
      preferredTime.required = false;

      preferredDate.value = "";
      preferredTime.value = "";
    }
  });

  // =============================
  // DATE VALIDATION
  // =============================
  preferredDate.oninvalid = () =>
    preferredDate.setCustomValidity("Please select your preferred date.");

  preferredDate.oninput = () =>
    preferredDate.setCustomValidity("");

  // =============================
  // TIME VALIDATION
  // =============================
  preferredTime.oninvalid = () =>
    preferredTime.setCustomValidity("Please select your preferred time.");

  preferredTime.oninput = () =>
    preferredTime.setCustomValidity("");

  // =============================
  // RESET VALIDATION ON INPUT
  // =============================
  [name, email, phone, subject, message].forEach(input => {

    input.addEventListener("input", () => {
      input.setCustomValidity("");
    });

  });

  // =============================
  // FORM SUBMIT
  // =============================
  form.addEventListener("submit", function (e) {

    e.preventDefault();

    // HTML validation first
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // STRICT EMAIL CHECK
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value)) {
      email.setCustomValidity("Please include a valid email address.");
      email.reportValidity();
      return;
    }

    // STRICT NAME CHECK
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!nameRegex.test(name.value)) {
      name.setCustomValidity("Name must contain letters only.");
      name.reportValidity();
      return;
    }

    // STRICT PHONE CHECK
    const phoneRegex = /^09\d{2}-\d{3}-\d{4}$/;

    if (!phoneRegex.test(phone.value)) {
      phone.setCustomValidity(
        "Phone number must follow 09XX-XXX-XXXX format."
      );
      phone.reportValidity();
      return;
    }

    // =============================
    // LOADING STATE
    // =============================
    button.disabled = true;
    button.textContent = "Sending...";
    button.classList.add("loading");

    status.textContent = "Sending your message...";
    status.className = "loading";

    // =============================
    // SUCCESS
    // =============================
    setTimeout(() => {

      status.textContent =
        "Message sent successfully! We’ll get back to you shortly.";

      status.className = "success";

      form.reset();

      // HIDE DATE/TIME AGAIN
      dateGroup.style.display = "none";
      timeGroup.style.display = "none";

      preferredDate.required = false;
      preferredTime.required = false;

      button.disabled = false;
      button.textContent = "SEND MESSAGE";
      button.classList.remove("loading");

    }, 1500);

  });

});

// =============================
// MOBILE MENU
// =============================
function toggleMenu() {

  document
    .querySelector('.hamburgerdrawer')
    .classList.toggle('open');

  document
    .querySelector('.overlay')
    .classList.toggle('open');

}
