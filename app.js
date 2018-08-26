// List of cardTypes
const cardTypes = [
 'fa-diamond', 'fa-diamond',
 'fa-paper-plane-o', 'fa-paper-plane-o',
 'fa-anchor', 'fa-anchor',
 'fa-bolt', 'fa-bolt',
 'fa-cube', 'fa-cube',
 'fa-leaf', 'fa-leaf',
 'fa-bicycle', 'fa-bicycle',
 'fa-bomb', 'fa-bomb',
];

// List of HTML cards and icons
const cards = document.querySelectorAll('.card');
const cardIcons = document.querySelectorAll('.card .fa');
const movesCount = document.querySelector('.moves');
const timerCount = document.querySelector('.timer');
const restart = document.querySelector('.restart');
const deck = document.querySelector('.deck');
const stars = document.querySelectorAll('.fa-star');
let openCards = [];
let firstOpenCard;
let secondOpenCard;
let matchedCards;
let moves;
let time;
let timer;

// Shuffle function for the cards
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  };
  return array;
};

// Shuffling the cards
function shuffleCards() {
  shuffle(cardTypes);
  for (let i = 0; i < cardTypes.length; i++) {
    const cardType = cardTypes[i];
    const cardIcon = cardIcons[i];
    cardIcon.classList.add(cardType);
  }
};

function runTimer() {
  deck.addEventListener('click', function() {
    timer = setInterval(function() {
      time ++;
      timerCount.textContent = time;
    }, 1000);
  }, { once: true });
}

function clearTimer() {
  clearInterval(timer);
  timerCount.textContent = time;
};

function startTimer() {
  clearTimer();
  runTimer();
};

// start fuction to initialize the game
function start() {
  matchedCards = 0;
  moves = 0;
  time = 0;
  stars[0].style.color = 'gold';
  stars[1].style.color = 'gold';
  stars[2].style.color = 'gold';
  movesCount.textContent = moves;
  shuffleCards();
  startTimer();
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function show(card) {
  if (card.className !== 'card open show' && card.className !== 'card match') {
    card.classList.add('open', 'show');
    openCards.push(card);
    count();
  }
};

function match(card) {
  if (openCards[1].innerHTML == openCards[0].innerHTML) {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    matchedCards ++;
  } else {
    openCards[0].classList.add('wrong');
    openCards[1].classList.add('wrong');
  }
};

function hide() {
  setTimeout(function() {
    openCards.forEach(function (openCard) {
      openCard.classList.remove('open', 'show', 'wrong');
    });
    openCards = [];
  }, 1000)
};

function count() {
  moves++;
  movesCount.textContent = moves;
  if (moves >= 100) {
    alert('SORRY YOU LOST!! nobody never had ' + moves + ' moves to solve it so, START OVER!!. Your time was ' + time + ' seconds FYI...');
  } else if (moves > 70) {
    stars[2].style.color = 'black';
    stars[1].style.color = 'black';
  } else if (moves > 40) {
    stars[2].style.color = 'black';
  }
};

function play() {
  cards.forEach(function (card) {
    card.addEventListener('click', function() {
      if (openCards.length < 2) {
        show(card);
        if (openCards.length == 2) {
          match(card);
          hide();
        }
      }
      win();
    })
  })
};

function win() {
  if (matchedCards == 8) {
    setTimeout(function() {
      alert('YOU WON!! in exactly ' + moves + ' moves. Your time was ' + time + ' seconds.');
    }, 500)
    clearTimer();
  }
};

function refresh() {
  restart.addEventListener('click', function() {
    hide();
    cardIcons.forEach(function (icon) {
      icon.parentElement.classList.remove('open', 'show', 'match');
      icon.className = 'fa';
    });
    start();
  })
}

// start of the GAME!!!
start();
play();
refresh();
