'use strict';

///////////////////////////////////////
// Modal window
const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Creating and inserting elements

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = ` we use cookies for functionality and analytics.<button class="btn btn--close-cookie"> Got it!</button>`;
//header.prepend(message);
header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'pink');

//Attributes

const logo = document.querySelector('.nav__logo');
logo.setAttribute('company', 'banklist');
console.log(logo.getAttribute('src'));

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const slcoords = section1.getBoundingClientRect();
  // console.log(slcoords);
  // console.log(e.target.getBoundingClientRect());

  // window.scrollTo({
  //   left: slcoords.left + window.pageXOffset,
  //   top: slcoords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

//page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//     console.log(id);
//   });
// });

//1.add event listener to common parent element;
//2.what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);

  //matching strategy

  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', function (e) {
//   // alert('hello');
// });

// //random color

// //rgb(255,255,255)

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log(randomColor());
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

const h1 = document.querySelector('h1');

//going docunwards

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
//h1.firstElementChild.style.color = 'red';

console.log(h1.parentNode);

const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;
  tabs.forEach(t => {
    t.classList.remove('operations__tab--active');
  });
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(c => {
    c.classList.remove('operations__content--active');
  });

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation

const HandleOver = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibilings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibilings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

const nav = document.querySelector('.nav');

nav.addEventListener('mouseover', function (e) {
  HandleOver(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  HandleOver(e, 1);
});

const intialCords = section1.getBoundingClientRect();
//sticky navigation

window.addEventListener('scroll', function (e) {
  if (window.scrollY > intialCords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

//Reveal Section
const allSection = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy loading images

const imgtargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace place holder

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgtargets.forEach(img => imgObserver.observe(img));

//slider

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnright = document.querySelector('.slider__btn--right');
//slider.style.transform = 'scale(0.4) translateX(-800px)';
//slider.style.overflow = 'visible';
const dotContainer = document.querySelector('.dots');

let currentslide = 0;
const maxslide = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `
      <button class="dots__dot" data-slide="${i}"> </button>
     
     
     
     `
    );
  });
};
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activeDot(slide);
  }
});
createDots();

const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activeDot(0);

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

goToSlide(0);

const nextSlide = function () {
  if (currentslide === maxslide - 1) {
    currentslide = 0;
  } else {
    currentslide++;
  }

  goToSlide(currentslide);
  activeDot(currentslide);
};

const prevSlide = function () {
  if (currentslide == 0) {
    currentslide = maxslide - 1;
  } else {
    currentslide--;
  }

  goToSlide(currentslide);
  activeDot(currentslide);
};
btnright.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});
