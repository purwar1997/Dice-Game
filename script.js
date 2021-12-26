'use strict';

let i, number, score, chances, players, scores;

// Selecting div and image elements
const div = document.querySelectorAll('.div');
const dice = document.querySelector('.dice');

// Selecting input fields
const inputNumber = document.querySelector('.number');
const inputName = document.querySelector('.name');

// Selecting buttons
const enterNumberBtn = document.querySelector('.enter-number');
const enterNameBtn = document.querySelector('.enter-name');
const rollBtn = document.querySelector('.roll');
const okBtn = document.querySelector('.ok');
const playAgainBtn = document.querySelector('.again');

// Selecting elements to display text
const message = document.querySelector('.message');
const playerNumber = document.querySelector('.player-number');
const playerName = document.querySelector('.player-name');
const scoreEl = document.querySelector('.score');
const chancesEl = document.querySelector('.chances');
const scoreTable = document.querySelector('.score-table');
const winner = document.querySelector('.winner');

// Setting initial values
const init = function () {
  i = 0;
  players = [];
  scores = [];
  inputNumber.value = null;
  inputName.value = null;
  playerNumber.textContent = 1;
  scoreEl.textContent = 0;
  chancesEl.textContent = 5;
  message.classList.add('hidden');
};

init();

// Event handler for enter-number button
enterNumberBtn.addEventListener('click', function () {
  number = inputNumber.value;
  message.classList.remove('hidden');
  if (number === '') {
    message.textContent = 'Please enter a value';
  } else if (Number(number) < 2) {
    message.textContent = 'Atleast 2 players are required';
  } else if (Number(number) > 5) {
    message.textContent = 'Maximum 5 players are allowed';
  } else {
    div[0].classList.add('hidden');
    div[1].classList.remove('hidden');
  }
});

// Event handler for enter-name button
enterNameBtn.addEventListener('click', function () {
  score = 0;
  chances = 5;
  scoreEl.textContent = 0;
  chancesEl.textContent = 5;
  players.push(inputName.value);
  playerName.textContent = `Player ${i + 1} : ${players[i]}`;
  rollBtn.classList.remove('hidden');
  div[1].classList.add('hidden');
  div[2].classList.remove('hidden');
});

// Event handler for roll dice button
rollBtn.addEventListener('click', function () {
  if (chances) {
    let rollValue = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${rollValue}.png`;
    dice.classList.remove('hidden');
    score += rollValue;
    chances--;
    scoreEl.textContent = score;
    chancesEl.textContent = chances;
  } else {
    scores.push(score);
    rollBtn.classList.add('hidden');
    dice.classList.add('hidden');
    div[3].classList.remove('hidden');
  }
});

// Event handler for OK button
okBtn.addEventListener('click', function () {
  i++;
  div[2].classList.add('hidden');
  div[3].classList.add('hidden');

  if (i < number) {
    playerNumber.textContent = i + 1;
    inputName.value = null;
    div[1].classList.remove('hidden');
  } else {
    let text = '';
    for (let i = 0; i < number; i++) {
      text += `Score of ${players[i]} : ${scores[i]} \n\n`;
    }
    scoreTable.textContent = text;

    let max = scores[0];
    for (let i = 1; i < scores.length; i++) {
      if (scores[i] > max) max = scores[i];
    }
    let index = scores.indexOf(max);
    winner.textContent = players[index];
    div[4].classList.remove('hidden');
  }
});

// Event Handler for Play again button
playAgainBtn.addEventListener('click', function () {
  init();
  div[4].classList.add('hidden');
  div[0].classList.remove('hidden');
});
