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
let scorePlayer = [0, 0];

let is_play = true;

let changeActivePlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  scoreCurrent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (is_play) {
    dice.classList.contains('hidden') && dice.classList.remove('hidden');
    const diceNum = Math.trunc(Math.random() * 6 + 1);
    dice.src = `dice-${diceNum}.png`;
    if (diceNum !== 1) {
      scoreCurrent += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        scoreCurrent;
    } else {
      changeActivePlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (is_play) {
    scorePlayer[activePlayer] += scoreCurrent;
    document.getElementById(`score--${activePlayer}`).textContent =
      scorePlayer[activePlayer];
    if (scorePlayer[activePlayer] >= 10) {
      is_play = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      changeActivePlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  dice.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  scoreCurrent = 0;
  scorePlayer = [0, 0];
  is_play = true;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  activePlayer = 0;
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
});
