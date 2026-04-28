//HEROSLIDESCHANGE
    let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 5000);


  
//HERO BUTTON FORM

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


//MENUSLIDER

const slider = document.getElementById("menuSlider");
const leftBtn = document.querySelector(".slider-btn.left");
const rightBtn = document.querySelector(".slider-btn.right");

function getScrollAmount() {
    const card = document.querySelector(".menucontainer");
    const gap = 20;
    return card.offsetWidth + gap;
}

rightBtn.addEventListener("click", () => {
    slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
});

leftBtn.addEventListener("click", () => {
    slider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
});

// MOBILE NAV MENU
function toggleMenu() {
  document.querySelector(".navlinks").classList.toggle("open");
}
