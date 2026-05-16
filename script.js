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


// MOBILE & TABLET NAV MENU
function toggleMenu() {
  document.querySelector(".hamburgerdrawer").classList.toggle("open");
  document.querySelector(".overlay").classList.toggle("open");
}

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

//hamburger
function toggleMenu() {
  document.querySelector(".hamburgerdrawer").classList.toggle("open");
  document.querySelector(".overlay").classList.toggle("open");
  document.body.classList.toggle("menu-open");
}
