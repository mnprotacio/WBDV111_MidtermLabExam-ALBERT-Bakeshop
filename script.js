/*
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
*/


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


//VIEWALL GALLERY CAROUSEL TESTIMONIALS
const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('carouselDots');

if (track && dotsContainer) {
  const cards = track.querySelectorAll('.card');
  const CARD_WIDTH = 220;
  const GAP = 20;
  const visible = window.innerWidth <= 768 ? 1 : 3;
  const max = Math.max(0, cards.length - visible);
  let current = 0;

  dotsContainer.innerHTML = '';
  for (let i = 0; i <= max; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, max));
    track.style.transform = `translateX(-${current * (CARD_WIDTH + GAP)}px)`;
    document.querySelectorAll('#carouselDots .dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  window.moveCarousel = function(dir) {
    goTo(current + dir);
  };
}

// FILTERBAR CHOICES LOGIC
function filterGallery(tag) {
    const items = document.querySelectorAll('.galleryitem');
    items.forEach(item => {
        if (tag === 'all' || item.dataset.tag === tag) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
