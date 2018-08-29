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
const title = document.querySelector('.modal h1');
const star = document.querySelectorAll('.fa-star');
const modal = document.querySelector('.modal');
const finalMoves = document.querySelector('.final-moves');
const finalTime = document.querySelector('.final-time');
const finalStars = document.querySelector('.final-stars');
const againButton = document.querySelector('.again');
let openCards = [];
let firstOpenCard;
let secondOpenCard;
let matchedCards;
let moves;
let time;
let stars;
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

// Star timer and assign value to HTML element every second
function runTimer() {
  timer = setInterval(function() {
    time ++;
    timerCount.textContent = time;
  }, 1000);
}

// Clear the timer setting the initial value to 0
function clearTimer() {
  deck.removeEventListener('click', runTimer);
  clearInterval(timer);
  timerCount.textContent = time;
};

// Clear and Start the timer for only first click
function startTimer() {
  clearTimer();
  deck.addEventListener('click', runTimer, { once: true });
};

// Start fuction to initialize the game
function start() {
  matchedCards = 0;
  moves = 0;
  time = 0;
  openCards = [];
  stars = '<p>&#9733; &#9733; &#9733;</p>';
  modal.style.display = 'none';
  star[0].style.color = 'gold';
  star[1].style.color = 'gold';
  star[2].style.color = 'gold';
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

// Shows the card symbol and adds it to openCards list
function show(card) {
  if (card.className !== 'card open show' && card.className !== 'card match') {
    card.classList.add('open', 'show');
    openCards.push(card);
    count();
  }
};

// Logic to match 2 cards in openCards list
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

// Hide cards
function hide() {
  setTimeout(function() {
    openCards.forEach(function (openCard) {
      openCard.classList.remove('open', 'show', 'wrong');
    });
    openCards = [];
  }, 1000)
};

// Count amount of movements and finish game if count is greater than 99
function count() {
  moves++;
  movesCount.textContent = moves;
  if (moves >= 100) {
    star[2].style.color = 'black';
    star[1].style.color = 'black';
    star[0].style.color = 'black';
    stars = '<p>&#9734; &#9734; &#9734;</p>';
    lose();
  } else if (moves > 70) {
    star[2].style.color = 'black';
    star[1].style.color = 'black';
    stars = '<p>&#9733; &#9734; &#9734;</p>';
  } else if (moves > 40) {
    star[2].style.color = 'black';
    stars = '<p>&#9733; &#9733; &#9734;</p>';
  }
};

// Initial event listener for every card to start playing
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

// reestar the game
function refresh() {
  cardIcons.forEach(function (icon) {
    icon.parentElement.classList.remove('open', 'show', 'match', 'wrong');
    icon.className = 'fa';
  });
  start();
}

// Show win banner
function win() {
  if (matchedCards == 8) {
    setTimeout(function() {
      title.textContent = 'You Won!';
      finalMoves.textContent = 'Your moves: ' + moves + ' moves';
      finalTime.textContent = 'Your time: ' + time + ' seconds';
      finalStars.textContent = 'Your stars: ';
      finalStars.innerHTML += stars;
      modal.style.display = 'flex';
      playAgain();
    }, 500)
    clearTimer();
  }
};

// Show lose banner
function lose() {
  title.textContent = 'You Lost!';
  finalMoves.textContent = 'Your moves: ' + moves + ' moves';
  finalTime.textContent = 'Your time: ' + time + ' seconds';
  finalStars.textContent = 'Your stars: ';
  finalStars.innerHTML += stars;
  modal.style.display = 'flex';
  clearTimer();
  playAgain();
}

// Play again from the banner
function playAgain() {
  againButton.addEventListener('click', refresh);
}

// Reestart the game before loosing or winning
function restartGame() {
  restart.addEventListener('click', refresh);
}

// start of the GAME!!!
start();
play();
restartGame();
