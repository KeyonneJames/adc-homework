const flashcards = [
    { term: "HTML", definition: "HyperText Markup Language" },
    { term: "CSS", definition: "Cascading Style Sheets" },
    { term: "JavaScript", definition: "Programming language of the web" }
];
const flashcardContent = document.getElementById("flashcard")
const next = document.getElementById("next-btn")
const previous = document.getElementById("prev-btn")
const newTerm = document.getElementById("new-term")
const newDef = document.getElementById("new-definition")
const addTerm = document.getElementById("add-card-btn")

// You can use flashcards.length to get the length of the array


// These two variables will come in handy
let currentIndex = 0;
let showingTerm = true;
let cards = flashcards.length;

// Start with this function to simply display the card
function displayCard() {
    const cardContent = document.getElementById("card-content");
    let card = flashcards[currentIndex];

    if (showingTerm) {
        cardContent.textContent = card.term;
    } else {
        cardContent.textContent = card.definition;
    }
}

function flipCard() {
    // allows to flip between term and def constantly 
    showingTerm = !showingTerm
    displayCard()
}

function nextCard() {
    // increment to go to the next card
    currentIndex++

    if(currentIndex >= cards){
        currentIndex = 0
    }
    
    showingTerm = true
    displayCard()
}

function previousCard() {
    currentIndex--

    if(currentIndex < 0){
        currentIndex = cards - 1
    }

    showingTerm = true
    displayCard()
}

function addCard() {
    let term = newTerm.value
    let definition = newDef.value
    // using push to add a new card using a term and definition from text boxes 
    flashcards.push({
        term: term,
        definition: definition
    })

    cards = flashcards.length
    newTerm.value = ""
    newDef.value = ""
}

// The rest of the code you will write is apart of event listeners
flashcardContent.addEventListener('click', flipCard)
next.addEventListener('click', nextCard)
previous.addEventListener('click', previousCard)
addTerm.addEventListener('click', addCard)


// This line will display the card when the page is refreshed
window.onload = displayCard;