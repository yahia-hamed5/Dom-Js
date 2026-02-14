const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;

//  open close modal
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// implementing smoth scrollings
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// page navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    if (id && id.startsWith('#') && id.length > 1) {
      const select = document.querySelector(id);
      if (!select) return;
      select.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// tabs click
tabsContainer.addEventListener('click', function (e) {
  const clecked = e.target.closest('.operations__tab');
  if (!clecked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clecked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clecked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// hove links
const handelHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handelHover.bind(0.5));
nav.addEventListener('mouseout', handelHover.bind(1));

// sticky nav
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(header);

//  Reveal Section
const allSectios = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.target) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.015,
});
allSectios.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy loading images

const imgTarget = document.querySelectorAll('img[data-src]');
console.log(imgTarget);

const loadImage = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};
const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTarget.forEach(img => imgObserver.observe(img));

// create slider component
const gotToSlide = function (slideNum) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slideNum)}%)`;
  });
};
gotToSlide(0);
const nextSlide = ()=>{
  if (curSlide === slides.length - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotToSlide(curSlide);
}
const prevSlide = ()=>{
   if (curSlide === 0) {
    curSlide =  slides.length - 1;
  } else {
    curSlide -- ;
  }
  gotToSlide(curSlide);
}
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click',prevSlide);

// console.log(document.head);
// console.log(document.body);

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = `We Use cookied for improved functionality and analytics. <button class="btn btn-close-cookie">Got it!</button>`;

// header.append(message);

// document.querySelector('.btn-close-cookie').addEventListener('click',function (){
//   message.parentElement.removeChild(message);
// })

// message.style.backgroundColor="#37383d";
// message.style.width="120%";
// console.log(getComputedStyle(message).height)
// console.log(getComputedStyle(message).backgroundColor)
// message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 30 + 'px'

// document.documentElement.style.setProperty('--color-primary','orangered')

// const logo = document.querySelector('.nav__logo')
// console.log(logo.alt)
// console.log(logo.getAttribute('designer'))
// logo.setAttribute('company','bankist')
// console.log(logo.getAttribute('company'))
// console.log(logo.dataset.id)

// logo.classList.add()
// logo.classList.remove()
// logo.classList.toggle()
// logo.classList.contains()

// -------------------------------

// type events

// one  mouseenter
// tow  mouseenter
// three  mouseenter
// four  mouseenter
// five  mouseenter
