
const chalk = require("chalk");
const { avogadroDependencies } = require("mathjs");

const GUESSES = 5
let guessesRemaining = GUESSES;

function chooseSolution() {
    var possibilities = ["SPACE", "WORDS", "INPUT", "CACHE", "PRINT", "ASCII", "DEBUG", "CLICK", "MODEM", "ROBOT", "PROXY", "WRITE", "VIRUS"];
    let word = Math.floor(Math.random() * possibilities.length);
    let solution = possibilities[word];
    return solution;
}

let sol = chooseSolution();


for (let m = 0; m < guessesRemaining; m++) {

getUserInput(sol);

function getUserInput(sol){
    var readline = require('readline-sync');
    var userInput = readline.question("Input a word: ");
    var length = userInput.length;
    let input = String(userInput).toUpperCase();
    if (length == 5) {
        getWordReview(input,sol);
    }
    else {getUserInput(); }
}

function getWordReview(input, sol) {
    var inputArr = input.split('');
    var solArr = sol.split('');
    console.log(solArr);
    var n = 0;
    var veces = 0;
    var iteraciones = 0

    for (let j = 0; j < solArr; j++) {
        if (solArr.includes(inputArr[j])) {
            n++;
        }
    } 

    while (iteraciones <= n) {

        if (!(solArr.includes(inputArr))) {
            iteraciones = n + 1;
            inputLetter = "Incorrect";
        }

        for (let i = 0; i < solArr.length; i++) {
            
            if ((inputArr[i] == solArr[i])) {
                iteraciones++;
                veces++;
                inputLetter = "Correct";
                var coloredletter = inputArr[i];
            }
            else if (!(solArr.includes(inputArr[i]))) {
                inputLetter = "Incorrect";
                var coloredletter = inputArr[i];
            }
            else {
                iteraciones++;
                veces++;
                inputLetter = "Misplaced";
                var coloredletter = inputArr[i]

            }
            veces = 0;
            iteraciones = i + 1;

            printUserSolution(inputLetter, coloredletter);

            /*if (guessesRemaining == 0) {
                console.log("Game over!");
                finish();
            } */
            //printUserSolution(inputLetter, coloredletter, inputArr, solArr);
            //again(solArr, inputArr);

        }
        
        if (input == sol) {
            guessesRemaining = 0;
            console.log("Correct!! You guessed right!");
            finish();
        } 

        else { guessesRemaining = guessesRemaining -1; }

        /*if (guessesRemaining == 0) {
            console.log("Game over!");
            finish();
        } */
        
        }

    }

    }


    function printUserSolution(inputLetter, coloredletter, guessesRemaining) {
        // ver si cada letra es correcta o no
        if (inputLetter == "Correct") {

            console.log(chalk.green(coloredletter));
        }
        else if (inputLetter == "Incorrect") {

            console.log(chalk.red(coloredletter));
        }
        else { 
            console.log(chalk.yellow(coloredletter));
        }

    } 


    function again(inputArr, solArr) {

        if (guessesRemaining != 0) { 
            console.log("You've got " + guessesRemaining + " guesses remaining");
        }

        else {
            console.log("Game over!")
            console.log("The correct word was: " + solArr);
            }
    }
    

    function finish() {
        console.log("Thank you for playing!");
    }
    

