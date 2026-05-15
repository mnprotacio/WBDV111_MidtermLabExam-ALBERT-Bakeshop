const slides = document.querySelectorAll('.slide');
const contents = document.querySelectorAll('.herocontent');

if (slides.length > 0) {
  let currentSlide = 0;

  slides.forEach(slide => slide.classList.remove('active'));
  slides[0].classList.add('active');

  if (contents.length > 0) {
    contents.forEach(c => c.classList.remove('active'));
    contents[0].classList.add('active');
  }

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    contents[currentSlide]?.classList.remove('active');

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add('active');
    contents[currentSlide]?.classList.add('active');
  }

  setInterval(nextSlide, 5000);
}



/* FORM

function openPopup() {
    document.getElementById("popup").classList.add("active");
}

function closePopup() {
    document.getElementById("popup").classList.remove("active");
}


const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", function () {
    const inputs = document.querySelectorAll(".popup-form input, .popup-form textarea, .popup-form select");
    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            isValid = false;
        }
    });

    if (isValid) {
        alert("Message sent successfully!");
        closePopup();
    } else {
        alert("All fields are required. Please fill out the form completely.");
    }
});
*/

// MENU SLIDES
const slider = document.getElementById("menugrid");
const leftBtn = document.querySelector(".slider-btn.left");
const rightBtn = document.querySelector(".slider-btn.right");

function getScrollAmount() {
    const card = document.querySelector(".menucontainer");
    const gap = 20;
    return (card.offsetWidth + gap) * 4;
}

rightBtn.addEventListener("click", () => {
    slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
});

leftBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
});


// MOBILE & TABLET NAV MENU
function toggleMenu() {
  document.querySelector(".hamburgerdrawer").classList.toggle("open");
  document.querySelector(".overlay").classList.toggle("open");
}

//HIDE&SHOW NAVBAR ON SCROLL
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 80) {
    // scrolling DOWN - hide navbar
    document.querySelector("header").style.transform = "translateY(-2   0%)";
  } else {
    // scrolling UP - show navbar
    document.querySelector("header").style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});

// FADE IN ANIMATION
const fadeElements = document.querySelectorAll('.fadedown');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

