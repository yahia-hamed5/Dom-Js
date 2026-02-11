const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

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

tabsContainer.addEventListener('click',function (e) {
  const clecked = e.target.closest('.operations__tab')
  if(!clecked) return
  tabs.forEach(t=>t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c=>c.classList.remove('operations__content--active'))
  clecked.classList.add('operations__tab--active')  
  document.querySelector(`.operations__content--${clecked.dataset.tab}`).classList.add('operations__content--active')
})

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

// implementing smoth scrollings
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// type events

// one  mouseenter
// tow  mouseenter
// three  mouseenter
// four  mouseenter
// five  mouseenter
