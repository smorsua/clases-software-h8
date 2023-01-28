import chalk from "chalk";
import readline from "readline-sync";
const GUESSES = 5;
let guessesRemaining = GUESSES;

function chooseSolution() {
    let possibilities = [
        // "SPACE",
        // "WORDS",
        // "INPUT",
        // "CACHE",
        // "PRINT",
        // "ASCII",
        // "DEBUG",
        // "CLICK",
        // "MODEM",
        // "ROBOT",
        // "PROXY",
        // "WRITE",
        // "VIRUS",
        "ABCDE",
    ];
    let word = Math.floor(Math.random() * possibilities.length);
    let solution = possibilities[word];
    return solution;
}

let sol = chooseSolution();
let inputLetter;

function getUserInput(sol) {
    let userInput = readline.question("Input a 5 letter word: ");
    let input = String(userInput).toUpperCase();
    getWordReview(input, sol);
}

function getWordReview(input, sol) {
    let inputArr = input.split("");
    let solArr = sol.split("");
    let n = 0;
    let veces = 0;
    let iteraciones = 0;

    for (let j = 0; j < solArr; j++) {
        if (solArr.includes(inputArr[j])) {
            n++;
        }
    }

    while (iteraciones <= n) {
        if (!solArr.includes(inputArr)) {
            iteraciones = n + 1;
            inputLetter = "Incorrect";
        }

        for (let i = 0; i < solArr.length; i++) {
            let coloredLetter;
            if (inputArr[i] == solArr[i]) {
                iteraciones++;
                veces++;
                inputLetter = "Correct";
                coloredLetter = inputArr[i];
            } else if (!solArr.includes(inputArr[i])) {
                inputLetter = "Incorrect";
                coloredLetter = inputArr[i];
            } else {
                iteraciones++;
                veces++;
                inputLetter = "Misplaced";
                coloredLetter = inputArr[i];
            }
            veces = 0;
            iteraciones = i + 1;

            printUserSolution(inputLetter, coloredLetter);
        }
        process.stdout.write("\n");

        if (input == sol) {
            guessesRemaining = 0;
            console.log("Correct!! You guessed right!");
            finish();
        } else {
            guessesRemaining = guessesRemaining - 1;
            console.log(
                "You've got " + guessesRemaining + " guesses remaining"
            );

            if (guessesRemaining == 0) {
                console.log("Sorry, you lost!");
                console.log("The correct word was " + sol.toLowerCase());
                finish();
            }
        }
    }
}

for (let m = 0; m < guessesRemaining + 4; m++) {
    getUserInput(sol);
}

function printUserSolution(inputLetter, coloredletter) {
    if (inputLetter == "Correct") {
        process.stdout.write(chalk.green(coloredletter));
    } else if (inputLetter == "Incorrect") {
        process.stdout.write(chalk.red(coloredletter));
    } else {
        process.stdout.write(chalk.yellow(coloredletter));
    }
}

function finish() {
    console.log("Thank you for playing!");
    process.exit();
}
