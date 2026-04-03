/* 
    Students! You will all be completing this matching card game.
    Follow the directions throughout this file to slowly build out 
    the game's features.
*/


// in game symbols
const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🍒', '🥝'];
// display the cards on the screen
let cards = [];
// These will be used when the user starts choosing cards
let firstCard = null, secondCard = null;
// You will need to lock the board to stop users from choosing cards when they choose two wrong cards
// (Don't have to worry about this too much)
let lockBoard = false; 


function initGame() { 
    // reset game state 
    firstCard = null; 
    secondCard = null; 
    lockBoard = false; 
    cards = []; 

    const gameBoard = document.getElementById('game-board');
    // we need to clear cards from the board when we start a new game
    // or else, it will just stack more cards on top of the old ones
    gameBoard.innerHTML = ''; 

    // create a deck with pairs of each symbol
    const deck = symbols.concat(symbols); 
    // console.log(deck)
    shuffleArray(deck); // shuffle them

    deck.forEach(sym => {
        const card = createCard(sym);
        cards.push(card);
        gameBoard.appendChild(card);
    });

    // when the play again button is clicked, call initGame to reset everything
    const restartBtn = document.getElementById('restart-btn');
    restartBtn.addEventListener('click', initGame);
    // console.log('i am resetting now')
}

/*
    The card will have the css class 'card' and it would be a good idea to somehow save what its symbol is
    within the element itself, since we'll need it for later and there's no easy way to get it from the arrays.
    For this, you should look up the "dataset" property in HTML.
    Also make sure to add the event listener with the 'flipCard' function
*/
function createCard(symbol) {

    // Create the element and give it the 'card' class
    const card = document.createElement('div');
    card.classList.add('card');

    // store the symbol on the element using dataset for easy access later
    // (accessible as card.dataset.symbol)
    card.dataset.symbol = symbol;

    // card needs to appear blank or "empty" to make it ''
    card.textContent = '';

    // when clicked, call flipCard with this element
    card.addEventListener('click', () => flipCard(card));
    return card;
}

/*
    This function will handle all the logic for flipping the card. You can check if a variable doesn't
    have a value attached to it or is null by doing if (variable === null) {} or if (variable == null) {} or  if (!variable){}
    If a card get's flipped, add the 'flipped' css class and also display the symbol. 
    Also, if this is the first card you picked, then set the firstCard variable to the card you just picked.
    If it's the second, then set the secondCard variable to it. Also, if that's the second card, then you 
    want to check for a match using the checkForMatch() function. 
*/
function flipCard(card) {
    // If the board is supposed to be locked or you picked the same card you already picked
    if (lockBoard || card === firstCard) return;
    card.classList.add('flipped');
    card.textContent = card.dataset.symbol;

  if (!firstCard) {
    firstCard = card;
    return;
  }
  
  secondCard = card;
  checkForMatch();
}

/* 
    If there's a match between the first two cards that you picked, you want to take those cards out of the
    game and then reset the board so that there is firstCard == null and secondCard == null.
    Otherwise, you should unflip the card and continue playing normally.
*/
function checkForMatch() {
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    disableCards();
  } else {
    unflipCards();

  }
}

// since we are calling this function when there is a match, we know that the first and second card are the same 
// so we can just disable them and change thier color to green
function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
}
/* ---------------------  Everything under has already been done for you -------------------------- */

function unflipCards() {

    // We lock the board so that the user can't touch the board while it is unflipping
    lockBoard = true;

    // i wanted to add a feature where if there is no match, the cards will turn red and then unflip after a second
    firstCard.classList.add('mismatched');
    secondCard.classList.add('mismatched');

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        // remove the mismatched marker as we flip them back
        firstCard.classList.remove('mismatched');
        secondCard.classList.remove('mismatched');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

initGame();