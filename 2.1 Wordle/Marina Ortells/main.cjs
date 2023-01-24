
//para ejecutar el código hay que escribir en la terminal: "node main.cjs"

const chalk = require("chalk");

const GUESSES = 5
let guessesRemaining = GUESSES;

function chooseSolution() {
    var possibilities = ["SPACE", "WORDS", "INPUT", "CACHE", "PRINT", "ASCII", "DEBUG", "CLICK", "MODEM", "ROBOT", "PROXY", "WRITE", "VIRUS"];
    let word = Math.floor(Math.random() * possibilities.length);
    let solution = possibilities[word];
    return solution;
}

let sol = chooseSolution();


for (let m = 0; m < guessesRemaining + 1; m++) {

//getWordReview(sol);

//getUserInput();
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
    //var sol = chooseSolution();
    const inputArr = input.split('');
    const solArr = sol.split('');
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
            guessesRemaining --;
            inputLetter = "Incorrect";
        }


        

        for (let i = 0; i < solArr.length; i++) {
            
            if (input == sol) {
                guessesRemaining = 0;
                console.log("Correct!! You guessed right!");
                break;
            } 
            
            if ((inputArr[i] == solArr[i])) {
                iteraciones++;
                veces++;
                //console.log(inputArr[i] + ": Correct");
                inputLetter = "Correct";
                var coloredletter = inputArr[i];
                //console.log(chalk.green(coloredletter));



            }
            else if (!(solArr.includes(inputArr[i]))) {
                //console.log(inputArr[i] + ": Incorrect");
                inputLetter = "Incorrect";
                var coloredletter = inputArr[i];
                //console.log(chalk.red(coloredletter));
            }
            else {
                //console.log(inputArr[i] + ": Misplaced");
                iteraciones++;
                veces++;
                inputLetter = "Misplaced";
                var coloredletter = inputArr[i];
                //console.log(chalk.yellow(coloredletter));
            }

            veces = 0;
            iteraciones = i + 1;

            printUserSolution(inputLetter, coloredletter);

        }
        
        if (guessesRemaining == 0) {
            console.log("Game over!");
            break;
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

                //again();

    } 

    /*function again(input, solution) {
        if (input == solution) {
        console.log("Correct!! You guessed right");
        guessesRemaining = 0;
        }

        else { 
            guessesRemaining --; 
            console.log("You've got " + guessesRemaining + " guesses remaining");
        }

            if (guessesRemaining == 0) {
                console.log("Game over!")
                console.log("The correct word was: " + input);
            }
        */
    }
    

