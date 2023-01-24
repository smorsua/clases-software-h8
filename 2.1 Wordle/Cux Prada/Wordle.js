import chalk from "chalk";
import { get } from "http";
import promptSync from "prompt-sync";

const prompt = promptSync();
const sol = "FUMAR";

let userInput = prompt("Introduzca su palabra en mayusculas, por favor: ");

while (sol !== userInput) {
    if (userInput.length !== 5) {
        console.log("La palabra debe ser de 5 letras.");
    } else {
        const wordState = getWordState(userInput, sol);
        printUserSolution(wordState);
    }

    userInput = prompt("Introduzca su palabra en mayusculas, por favor: ");
}

if (sol === userInput) {
    const wordState = getWordState(userInput, sol);
    printUserSolution(wordState);
}

function getWordState(userInput, sol) {
    const inputArr = userInput.split("");
    const solArr = sol.split("");
    const solutionMap = getLetterCountMap(sol);
    let userMap = new Map();

    const wordState = [];

    for (let i = 0; i < inputArr.length; i++) {
        let inputLetter = inputArr[i];
        let solLetter = solArr[i];
        const letterState = getLetterState(
            inputLetter,
            solLetter,
            solutionMap,
            userMap
        );

        wordState.push(letterState);
    }

    return wordState;
}

function getLetterState(inputLetter, solLetter, solutionMap, userMap) {
    const letterState = {};
    letterState["letter"] = inputLetter;

    if (inputLetter === solLetter) {
        letterState["state"] = "Correct";
    } else {
        if (solutionMap.has(inputLetter)) {
            if (userMap.has(inputLetter)) {
                if (userMap.get(inputLetter) >= solutionMap.get(inputLetter)) {
                    letterState["state"] = "Incorrect";
                } else {
                    letterState["state"] = "Misplaced";
                    let count = userMap.get(inputLetter);
                    count += 1;
                    userMap.set(inputLetter, count);
                }
            } else {
                userMap.set(inputLetter, 1);
            }
        } else {
            letterState["state"] = "Incorrect";
        }
    }
    return letterState;
}

function isCorrectLength(word) {
    if (word.length === 5) {
        return true;
    }
    return false;
}

function getWordReview(word, sol) {
    const inputArr = word.split("");
    const solutionArr = sol.split("");
    const letterStates = [];

    for (let i = 0; i < inputArr.length; i++) {
        let letterState = {};
        letterState["letter"] = inputArr[i];

        if (inputArr[i] === solutionArr[i]) {
            letterState["state"] = "Correct";
        } else {
            for (let j = 0; j < solutionArr.length; j++) {
                if (inputArr[i] === solutionArr[j]) {
                    letterState["state"] = "Misplaced";
                    break;
                } else {
                    letterState["state"] = "Incorrect";
                }
            }
        }

        letterStates.push(letterState);
    }

    return letterStates;
}

function getLetterCountMap(sol) {
    let letterCount = new Map();
    const solArr = sol.split("");

    for (let i = 0; i < solArr; i++) {
        if (letterCount.has(solArr[i])) {
            let count = letterCount.get(solArr[i]);
            count += 1;
            letterCount.set(solArr[i], count);
        } else {
            letterCount.set(solArr[i], 1);
        }
    }

    return letterCount;
}

function getLetterStatus(inputArr, solutionArr, userLetterCount) {
    const solutionLetterCounts = [];

    for (let i = 0; i < inputArr.length; i++) {
        if (inputArr[i] === solutionArr[i]) {
            const solutionLetterCount = {
                letter: inputArr[i],
                state: "Correct",
                count: userLetterCount[inputArr[i]],
            };

            solutionLetterCounts.push(solutionLetterCount);
        }
    }
    return solutionLetterCounts;
}

function printUserSolution(letterStates) {
    let solution = "";
    for (const { letter, state } of letterStates) {
        let color;
        if (state === "Correct") {
            solution += chalk.bgGreen(letter);
        } else if (state === "Misplaced") {
            solution += chalk.bgYellow(letter);
        } else {
            solution += chalk.bgRed(letter);
        }
    }
    console.log(solution);
}
