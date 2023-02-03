//import chalk from "chalk";
//import readline from "readline-sync";

const chalk = require("chalk");
const readline = require("readline-sync");

const GUESSES = 5
let guessesRemaining = GUESSES;

chooseSolution();
getLetterMapSol(Solution);
getLetterMapInput(userInput);
getWordReview(userInput, Solution, valueIn, valueSol);

function chooseSolution() {
    var possibilities = ["SPACE", "WORDS", "INPUT", "CACHE", "PRINT", "ASCII", "DEBUG", "CLICK", "MODEM", "ROBOT", "PROXY", "WRITE", "VIRUS"];
    let word = Math.floor(Math.random() * possibilities.length);
    let solution = possibilities[word];
    return solution;
}

const Solution = chooseSolution();

for (let m = 0; m < guessesRemaining + 4; m++) {
    getUserInput(Solution);
    }


function getUserInput(Solution){
    
    var userInput = readline.question("Input a 5 letter word: ");
    return String(userInput).toUpperCase();
}

const userInput = getUserInput();

function getLetterMapSol(Solution) {

    let SolutionLetterMap = new Map();

    for (let i = 0; i < Solution.length; i++) {
        if (SolutionLetterMap.has(Solution[i])) {
            SolutionLetterMap.set(Solution[i], SolutionLetterMap.get(Solution[i]) + 1);
        }
        else {
            SolutionLetterMap.set(Solution[i], 1);
        }
    }

    for (let [keySol, valSol] of SolutionLetterMap.entries()) {
        console.log(keySol + " " + valSol);
        return valSol;
    }
}

const valueSol = getLetterMapSol();


function getLetterMapInput(userInput) {

    let InputLetterMap = new Map();

    for (let i = 0; i < userInput.length; i++) {
        if (InputLetterMap.has(userInput[i])) {
            InputLetterMap.set(userInput[i], InputLetterMap.get(userInput[i]) + 1);
        }
        else {
            InputLetterMap.set(userInput[i], 1);
        }
    }

    for (let [keyIn, valIn] of InputLetterMap.entries()) {
        console.log(keyIn + " " + valIn);
        return valIn;
    }


}

const valueIn = getLetterMapInput();



function getWordReview(userInput, Solution, valueIn, valueSol) {
    var n = 0;

    var iteraciones = 0

    for (let j = 0; j < Solution.length; j++) {
        if (Solution.includes(userInput[j])) {
            n++;
        }
    } 

    while (iteraciones <= n) {

        let veces = 0;

        if (!(Solution.includes(userInput))) {
            iteraciones = n + 1;
            inputLetter = "Incorrect";
        }

        for (let i = 0; i < Solution.length; i++) {

            if ((userInput[i] == Solution[i])) {
                iteraciones++;
                veces++;
                inputLetter = "Correct";
                var coloredletter = userInput[i];
            }
            else if (!(Solution.includes(userInput[i]))) {
                inputLetter = "Incorrect";
                var coloredletter = userInput[i];
            }
            else {

                if (valueSol < valueIn) {

                    iteraciones++;
                    veces++;
                    inputLetter = "Misplaced";
                    var coloredletter = userInput[i]
                }

                else {
                    inputLetter = "Incorrect";
                    var coloredletter = userInput[i];
                }

            }

            veces = 0;
            iteraciones = i + 1;

            printUserSolution(inputLetter, coloredletter);

        }
    }

        if (userInput == Solution) {
            guessesRemaining = 0;
            console.log("Correct!! You guessed right!");
            finish();
        } 

        else {
            
            guessesRemaining = guessesRemaining - 1;
            console.log("You've got " + guessesRemaining + " guesses remaining");

            if (guessesRemaining == 0) {
                console.log("Sorry, you lost!")
                console.log("The correct word was " + (solStr).toLowerCase());
                finish();
            }
        }
    }

function printUserSolution(inputLetter, coloredletter) {
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

function finish() {
    console.log("Thank you for playing!");
    process.exit();
    
}

getLetterMapSol(Solution);
getLetterMapInput(userInput);
getWordReview(userInput, Solution, valueIn, valueSol);