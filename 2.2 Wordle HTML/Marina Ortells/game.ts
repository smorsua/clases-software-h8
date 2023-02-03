type LetterState = "Correct" | "Incorrect" | "Misplaced" | undefined;

type LetterRating = {
    letter: string;
    state: LetterState;
};

type WordRating = LetterRating[];

export class WordleWordComparator {
    private userInputLetterToCount!: Map<string, number>;
    private solutionLetterToCount!: Map<string, number>;
    private finalRating!: WordRating;

    constructor() {}

    private initComparator(userInputArr: string[], solutionArr: string[]): void {
        this.userInputLetterToCount = new Map();
        this.setSolutionLetterToCount(solutionArr);
        this.finalRating = userInputArr.map((letter) => ( {
            letter: letter,
            state: undefined,
        }));
    }

    private checkCorrectLetters(userInputArr: string[], solutionArr: string[]): void {
        for (let i = 0; i < userInputArr.length; i++) {
            if (solutionArr[i] == userInputArr[i]){
                this.finalRating[i].state = "Correct";
                this.increaseUserLetterCount(userInputArr[i]);
            }
            }
        }

    private checkMisplacedOrIncorrectLetters(userInputArr: string[], solutionArr: string[]) {
        for (let i = 0; i < userInputArr.length; i++){
            const checkMorI = this.isMisplacedOrIncorrect(userInputArr[i], solutionArr[i]);
    }
}
    private isMisplacedOrIncorrect(userLetter: string, solutionLetter: string){
        if (!this.solutionLetterToCount.has(userLetter)) {
            return "Incorrect";
        }

        else if (this.userInputLetterToCount.get(userLetter)! < (this.solutionLetterToCount.get(userLetter) ?? 0)) {
            return "Misplaced";
        }
        else {
            return "Incorrect";
        }
    }

    private increaseUserLetterCount(letter: string): void {
        if (this.userInputLetterToCount.has(letter)) {
            this.userInputLetterToCount.set(letter, this.userInputLetterToCount.get(letter)! + 1);
        }
        else {
            this.userInputLetterToCount.set(letter, 1);
        }
    }

    private setSolutionLetterToCount(solutionArr: string[]): void {
        this.solutionLetterToCount = getLetterCount(solutionArr);
    }

    private getLetterCount(solutionArr: string[]) {
       
    }

}


