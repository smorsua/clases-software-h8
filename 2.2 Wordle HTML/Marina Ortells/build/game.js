"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordleWordComparator = void 0;
class WordleWordComparator {
    constructor() { }
    initComparator(userInputArr, solutionArr) {
        this.userInputLetterToCount = new Map();
        this.setSolutionLetterToCount(solutionArr);
        this.finalRating = userInputArr.map((letter) => ({
            letter: letter,
            state: undefined,
        }));
    }
    checkCorrectLetters(userInputArr, solutionArr) {
        for (let i = 0; i < userInputArr.length; i++) {
            if (solutionArr[i] == userInputArr[i]) {
                this.finalRating[i].state = "Correct";
                this.increaseUserLetterCount(userInputArr[i]);
            }
        }
    }
    checkMisplacedOrIncorrectLetters(userInputArr, solutionArr) {
        for (let i = 0; i < userInputArr.length; i++) {
            const checkMorI = this.isMisplacedOrIncorrect(userInputArr[i], solutionArr[i]);
        }
    }
    isMisplacedOrIncorrect(userLetter, solutionLetter) {
        var _a;
        if (!this.solutionLetterToCount.has(userLetter)) {
            return "Incorrect";
        }
        else if (this.userInputLetterToCount.get(userLetter) < ((_a = this.solutionLetterToCount.get(userLetter)) !== null && _a !== void 0 ? _a : 0)) {
            return "Misplaced";
        }
        else {
            return "Incorrect";
        }
    }
    increaseUserLetterCount(letter) {
        if (this.userInputLetterToCount.has(letter)) {
            this.userInputLetterToCount.set(letter, this.userInputLetterToCount.get(letter) + 1);
        }
        else {
            this.userInputLetterToCount.set(letter, 1);
        }
    }
    setSolutionLetterToCount(solutionArr) {
        this.solutionLetterToCount = getLetterCount(solutionArr);
    }
    getLetterCount(solutionArr) {
        return true;
    }
}
exports.WordleWordComparator = WordleWordComparator;
