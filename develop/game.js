/**
 * Organize everything the application will need to access.
 */

var gameContainer = document.getElementById("game-container");
var currentQuestionEl = document.getElementById("current-question");
var scoreEl = document.getElementById("score");
var finalScoreEl = document.getElementById("final-score");
var questionCardsEl = document.getElementById("questions-cards");
var newHighScoreForm = document.getElementById("new-highscore");
var initialsInput = document.getElementById("initials");

var currentSection;
var sections = Object.fromEntries(
    [
        "intro",
        "game",
        "results-success",
        "results-success-submit",
        "results-fail"
    ].map(function( elementId ) {

        return [ elementId, document.getElementById(elementId) ];

    })
);

var pointsPerQuestion = 20;

/**
 * Configure Interfaces
 */

// Set what we want to happen each time the quizScore is updated.
quizScore.setAfterUpdate( renderScore );

/**
 * Primary Game Actions
 */

 // Displays the target section
function setSection( pointer ) {

    if( pointer !== currentSection && currentSection ) sections[currentSection].classList.remove("is-shown");

    currentSection = pointer;
    sections[currentSection].classList.add("is-shown");

}

// Start the game
function startGame() {

    // Set the starting score. User will have 20 potential points per question
    quizScore.set( quizQuestions.list.length * pointsPerQuestion );

    // Ensure our questions are reset the to beginning.
    quizQuestions.reset();

    renderQuestionCards();

    // Render the current question.
    renderQuestion( quizQuestions.getCurrent() );
    renderCardStatus( quizQuestions.position, "active" );
    
    // Start the timed countdown and provide the end game function to run if the score count's down to zero.
    quizScore.startCountdown( endGame );

    // Display the game section for the user to start playing the game.
    setSection("game");

}

// Ends the game and moves the user to the appropriate result section.
function endGame() {

    // Ensure the score countdown stops.
    quizScore.endCountdown();

    var finalScore = quizScore.get();

    // Display the final score.
    finalScoreEl.textContent = finalScore;

    // Display the results section for the user to enter their highscore or replay.
    setSection( `results-${finalScore ? "success" : "fail"}` );

}

// Continues the game from where the user is at, moving to the next question, or ending the game if appropriate.
function continueGame() {

    // Get the next question.
    var nextQuestion = quizQuestions.getNext();

    // End the game if we have run out of questions.
    if( !nextQuestion ) {
        endGame();
        return;
    }

    // If we get to here, then we have a question to render!
    renderQuestion( nextQuestion );
    renderCardStatus( quizQuestions.position, "active" );

}

// Adds the current score to the DOM.
function renderScore() {

    scoreEl.textContent = quizScore.get();

}

// Adds question data to the DOM.
function renderQuestion( question ) {

    // Creates an array list of <button> tags for each question choice.
    var buttons = question
        .choices
        .map(function( choiceText, index ) {
            return `<p><button data-action="answer" data-index="${index}">${choiceText}</button></p>`;
        })
        .join("");

    /**
     *  Add all the needed HTML to the page. Assigning an HTML string to the
     *  `innerHTML` property will help automatically convert it into real HTML
     *  elements in the DOM.
     */
    currentQuestionEl.innerHTML = `
    <h2>${question.question}</h2>
    ${buttons}`;

}

// Answer the question.
function answerQuestion( choice ) {

    /**
     * Compare the button's data to the answer for the current questions.
     * If they didn't answer correctly, subtract points from their score.
     */
    if( choice !== quizQuestions.getCurrent().answer ) {

        renderCardStatus( quizQuestions.position, "fail" );
        quizScore.subtract( pointsPerQuestion );

        // If the score has hit zero, end the game.
        if( !quizScore.get() ) {
            endGame();
            return;
        }

    } else {

        renderCardStatus( quizQuestions.position, "success" );

    }

    continueGame();

}

function renderQuestionCards() {

    function renderCard( question, i ) {
        return `<div class="question-card"><span>${i+1}</span></div>`;
    }

    questionCardsEl.innerHTML = quizQuestions.list.map( renderCard ).join("");

}

function renderCardStatus( position, state ) {
    switch( state ) {
        case "active":
            questionCardsEl.children[position].classList.add("is-active");
            break;
        case "success":
            questionCardsEl.children[position].classList.add("is-success");
            questionCardsEl.children[position].classList.remove("is-active");
            break;
        case "fail":
            questionCardsEl.children[position].classList.add("is-fail");
            questionCardsEl.children[position].classList.remove("is-active");
            break;
    }
}

function init() {

    // Display the game intro
    setSection("intro");

}

function handleControls( event ) {

    // Decide what a click should do be checking the targets `data-action` value.
    var action = event.target.dataset.action;

    // If it doesn't have one, then don't do anything special with this click event.
    if( !action ) return;

    event.preventDefault();

    switch( action ) {
        case "start":
            startGame();
            return;
        case "answer":
            // Pass in the button's `data-index` value as the "choice".
            answerQuestion( parseInt( event.target.dataset.index ) );
            return;
    }

}

// Delegate all button clicks to a central handler.
gameContainer.addEventListener( "click", handleControls );

function submitNewScore( event ) {

    event.preventDefault();

    var name = initialsInput.value.trim();

    if( !name ) return;

    highscores.submit( quizScore.get(), name );

    setSection( "results-success-submit" );

    initialsInput.value = "";

}

newHighScoreForm.addEventListener( "submit", submitNewScore );

init();