// CLI WORDLE
/**
 * Aqui teneis explicado como plantear la tarea.
 *
 * Flujo del programa:
 *
 * 1. Obtener palabra de usuario
 * 2. Comparar palabra de usuario con solución
 * 3. Imprimir con colores cada letra al estilo de Wordle
 * 4. Repetir desde el principio hasta que el usuario acierte la palabra
 *
 * ---
 *
 * Las funciones que teneis debajo deben de estar es vuestro programa.
 */

//Devuelve una palabra que teclea el usuario

/*

function getUserInput(): string;

//Devuelve un booleano que indica si la palabra es de 5 letras o no
function isCorrectLength(userInput: string): boolean;

//Devuelve un array con información de cada letra
function getWordReview(
    userInput: string,
    solution: string
): [{ letter: string; state: "Correct" | "Misplaced" | "Incorrect" }];

//Devuelve un mapa que va de una letra al número de veces que aparece en una palabra
function getLetterCountMap(word: string): Map<string, number>;

//Devuelve el estado de una letra de la palabra del usuario en función de la letra correcta obtenida de la solución y cuantas veces a sido comprobada esa letra (esto último lo sacamos del mapa)
function getLetterStatus(
    userLetter,
    solutionLetter,
    userLetterCount,
    solutionLetterCount
): { letter: string; state: "Correct" | "Misplaced" | "Incorrect" };

//Imprime la solución propuesta por el usuario con los colores adecuados en cada letra
function printUserSolution(
    wordReview: [
        { letter: string; state: "Correct" | "Misplaced" | "Incorrect" }
    ]
);

//Devuelve la letra coloreada con el estilo adecuado según el estado
function applyLetterStyle(letterReview: {
    letter: string;
    color: string;
    state: "Correct" | "Misplaced" | "Incorrect";
}): string; */
