const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');

let scoreCurrent = 0;
let activePlayer = 0;

btnRoll.addEventListener('click', function () {
  dice.classList.contains('hidden') && dice.classList.remove('hidden');
  const diceNum = Math.trunc(Math.random() * 6 + 1);
  dice.src = `dice-${diceNum}.png`;
  if (diceNum !== 1) {
    scoreCurrent += diceNum;
    document.getElementById(`current--${activePlayer}`).textContent =
      scoreCurrent;
  } else {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active')
    scoreCurrent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
  }
});
