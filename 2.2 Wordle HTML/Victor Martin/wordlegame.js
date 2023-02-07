"use strict";
exports.__esModule = true;
exports.WordleWordComparator = void 0;
var NUMBER_OF_GUESSES = 6;
var WORD_LENGTH = 5;
var ROW_CLASS = 'row';
var LETTER_CLASS = 'letter';
var CORRECT = "correct";
var MISPLACED = "misplaced";
var INCORRECT = "incorrect";
var nextLetterIndex = 0;
var currentRowIndex = 0;
var currentGuess = [];
var WordleWordComparator = /** @class */ (function () {
    function WordleWordComparator() {
    }
    WordleWordComparator.prototype.getLetterState = function (index) {
        return this.finalRating[index].state;
    };
    ;
    WordleWordComparator.prototype.solutionArrayBuilding = function (solution) {
        var solutionArr = solution.split('');
        return solutionArr;
    };
    ;
    WordleWordComparator.prototype.getWordRating = function (currentGuess) {
        var userInputArr = currentGuess;
        var solutionArr = this.solutionArrayBuilding(solution);
        this.initComparator(userInputArr, solutionArr);
        this.checkCorrectLetters(userInputArr, solutionArr);
        this.checkMisplacedandIncorrectLetters(userInputArr);
    };
    WordleWordComparator.prototype.initComparator = function (userInputArr, solutionArr) {
        this.userInputLetterToCount = new Map();
        this.setSolutionLetterToCount(solutionArr);
        this.finalRating = userInputArr.map(function (letter) { return ({
            letter: letter,
            state: undefined
        }); });
    };
    ;
    WordleWordComparator.prototype.checkCorrectLetters = function (userInputArr, solutionArr) {
        for (var i = 0; i < WORD_LENGTH; i++) {
            if (userInputArr[i] == solutionArr[i]) {
                this.finalRating[i].state = "Correct";
                this.increaseUserLetterCount(userInputArr[i]);
            }
        }
    };
    ;
    WordleWordComparator.prototype.checkMisplacedandIncorrectLetters = function (userInputArr) {
        for (var j = 0; j < WORD_LENGTH; j++) {
            var letter = userInputArr[j];
            this.conditionalIncMis(j, letter);
            this.finalRating[j].state = this.conditionalIncMis(j, letter);
            this.increaseUserLetterCount(letter);
        }
    };
    ;
    WordleWordComparator.prototype.increaseUserLetterCount = function (letter) {
        if (!this.userInputLetterToCount.has(letter)) {
            this.userInputLetterToCount.set(letter, 1);
        }
        else {
            this.userInputLetterToCount.set(letter, this.userInputLetterToCount.get(letter) + 1);
        }
    };
    ;
    WordleWordComparator.prototype.setSolutionLetterToCount = function (solutionArr) {
        for (var i = 0; i < WORD_LENGTH; i++) {
            var solLetter = solutionArr[i];
            if (!this.solutionLetterToCount.has(solLetter)) {
                this.solutionLetterToCount.set(solLetter, 1);
            }
            else {
                this.solutionLetterToCount.set(solLetter, this.solutionLetterToCount.get(solLetter) + 1);
            }
        }
    };
    ;
    WordleWordComparator.prototype.conditionalIncMis = function (index, letter) {
        var _a;
        if ((!this.solutionLetterToCount.has(letter)) || ((_a = this.userInputLetterToCount.get(letter)) !== null && _a !== void 0 ? _a : 0 >= this.solutionLetterToCount.get(letter))) {
            return "Incorrect";
        }
        else {
            return "Misplaced";
        }
    };
    ;
    return WordleWordComparator;
}());
exports.WordleWordComparator = WordleWordComparator;
;
// Function declarations
// We start with a Solution selector
function chooseSolution() {
    var wordleWords = ["cigar", "rebut", "sissy", "humph", "awake", "blush", "focal",
        "evade", "naval", "serve", "heath", "dwarf", "model", "karma", "stink", "grade",
        "quiet", "bench", "abate", "feign", "major", "death", "fresh", "crust", "stool",
        "colon", "abase", "marry", "react", "batty", "pride", "floss", "helix", "croak",
        "staff", "paper", "unfed", "whelp", "trawl", "outdo", "adobe", "crazy", "sower",
        "repay", "digit", "crate", "cluck", "spike", "mimic", "pound", "maxim", "linen",
        "unmet", "flesh", "booby", "forth", "first", "stand", "belly", "ivory", "seedy",
        "print", "yearn", "drain", "bribe", "stout", "panel"];
    var solutionIndex = Math.floor(Math.random() * wordleWords.length);
    var solution = wordleWords[solutionIndex];
    return solution;
}
;
// We state the solution word
var solution = chooseSolution();
// This initializes the Game Board
function initBoard() {
    var board = document.getElementById("gameBoard");
    for (var i = 0; i < NUMBER_OF_GUESSES; i++) {
        //Crear row
        var row = document.createElement("div");
        row.classList.add(ROW_CLASS);
        for (var j = 0; j < WORD_LENGTH; j++) {
            var letter = document.createElement("div");
            letter.classList.add(LETTER_CLASS);
            row.appendChild(letter);
        }
        board.appendChild(row);
    }
}
;
// Now we need to state the actions for each keyboard input
function handleUserInput() {
    document.addEventListener('keydown', function (ev) {
        var userInput = ev.key;
        if (/[a-zA-Z]/.test(userInput) && userInput.length == 1) {
            addLetter(userInput);
        }
        else if (userInput == 'Backspace' || userInput == 'Delete') {
            deleteLetter();
        }
        else if (userInput == 'Enter') {
            handleEnter();
        }
        else {
            console.warn("".concat(ev.key, " is not a valid input"));
        }
    });
}
; // Basically, three types of keys are accepted, letters, backspace and enter.
// Let's dive into each key type and their functions
// For each letter key, we add the letter
function addLetter(userInput) {
    if (nextLetterIndex < WORD_LENGTH) {
        var rows = document.getElementsByClassName(ROW_CLASS);
        var currentRow = rows[currentRowIndex];
        var nextLetterElement = currentRow.children[nextLetterIndex];
        nextLetterElement.textContent = userInput.toUpperCase();
        currentGuess.push(userInput.toUpperCase());
        nextLetterIndex++;
    }
}
;
// For the backspace we delete the last letter
function deleteLetter() {
    if (nextLetterIndex > 0) {
        var rows = document.getElementsByClassName(ROW_CLASS);
        var currentRow = rows[currentRowIndex];
        var letterElement = currentRow.children[nextLetterIndex - 1];
        letterElement.textContent = '';
        currentGuess.pop();
        nextLetterIndex--;
    }
}
;
// For the enter, we evaluate the guess and get our Word Review, using the previous class
function handleEnter() {
    if (nextLetterIndex == (WORD_LENGTH)) {
        var nextLetterIndex_1 = 0;
        var rows = document.getElementsByClassName(ROW_CLASS);
        var currentRow = rows[currentRowIndex];
        var currentLetterElement = currentRow.children[nextLetterIndex_1];
        var GuessRating = getWordReview();
        for (var j = 0; j < WORD_LENGTH; j++) {
            nextLetterIndex_1++;
            var currentLetterState = GuessRating.getLetterState(j);
            dyeLetters(currentLetterState, currentLetterElement);
        }
        currentRowIndex++;
    }
    else {
        console.warn("The answer must have a ".concat(WORD_LENGTH, " character length"));
    }
}
; // In here we need to state the currentLetterElement in a loop in order to dye each square
// Let's dive into handleEnter and how we evaluate the guess
// We have to get the word review and the results will be used for dying each square
function getWordReview() {
    // This should return the letter-state relation.
    var GuessRating = new WordleWordComparator();
    return GuessRating;
}
; // Maybe we can do a little function to verify if the guess is in our word list
// Here we should have our relation to access each state, and then add the color to each element
function dyeLetters(currentLetterState, currentLetterElement) {
    var LetterElement = currentLetterElement;
    var state = currentLetterState;
    if (state == "Correct") {
        LetterElement.classList.add(CORRECT);
    }
    else if (state == "Misplaced") {
        LetterElement.classList.add(MISPLACED);
    }
    else if (state == "Incorrect") {
        LetterElement.classList.add(INCORRECT);
    }
    else {
        console.warn("An unexpected error happened");
    }
}
;
initBoard();
handleUserInput();
