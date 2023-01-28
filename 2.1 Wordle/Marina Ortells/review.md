# Corrección tarea Wordle CLI

## Valoración general: Aprobadísima ✅

El juego funciona aunque he tenido que solucionar algún bug para poder ejecutarlo. Abajo te he puesto una lista de cosas que hay que cambiar y recomendaciones para que te quede un código perfecto. Buen trabajo!

## 🪲 Bugs de la lógica juego

-   Si la solución es "ABCDE" y el usuario pone "AAAAA", la primera se colorea en verde y el resto en amarillo, pero deberia colorearse la primera en verde y el resto en rojo porque no hay más "A" en la solución. Esto sucede porque el código que calcula es estado de la letra no contempla que ya haya sido "usada".

```javascript
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
        // AQUI NO SABEMOS SI LA LETRA "A" YA HA SIDO COMPROBADA ANTES
        iteraciones++;
        veces++;
        inputLetter = "Misplaced";
        coloredLetter = inputArr[i];
    }
    veces = 0;
    iteraciones = i + 1;

    printUserSolution(inputLetter, coloredLetter);
}
```

Una posible manera de solucionar esto es usar un mapa.

### Tutorial `Map`

Un mapa es como un diccionario de Python, consiste en una lista de parejas llave/valor:

```javascript
// Esta no es la sintaxis para declarar un mapa! Es una manera de representarlos
const myMap = {
    a: 1,
    d: 0,
    c: 3,
};
```

Las llaves serían `a, d, c` y los valores sería lo que tiene cada uno a su derecha. Si quisieses crear el mapa del ejemplo lo harías de la siguiente manera:

```javascript
const myMap = new Map();
myMap.set("a", 1);
myMap.set("d", 0);
myMap.set("c", 3);
```

Luego podrías coger un valor del mapa así:

```javascript
const a = myMap.get("a"); // a = 1
```

Tambien podemos comprobar si una llave existe en un mapa (dicho de otra forma, si ya hemos metido esa llave antes):

```javascript
const doesAExist = myMap.has("a"); // doesAExist = true
const doesZExist = myMap.has("z"); // doesZExist = false
```

### Como usar el `Map` para comprobar el `userInput`

Tienes que crear una función que le pasas una palabra y te devuelve un mapa que contiene cuantas veces aparace cada letra. Ejemplo:

```javascript
function getLetterMap(word: string): Map<string,number> {...}

const solution = "PRINT"
const solutionLetterToCount = getLetterMap(solution)

//  solutionLetterToCount = {
//      "P": 1,
//      "R": 1,
//      "I": 1,
//      "N": 1,
//      "T": 1
//  }
```

Luego, creas otro mapa vacio que usaremos para llevar cuenta de las letras de `userInput` que comprobemos en el bucle.

```javascript
const userLetterToCount = new Map();
```

Cada vez que compruebes una de las letras del usuario debes añadirla al mapa (la llave es la letra y el valor `1`). Si ya la has comprobado antes (pista: `myMap.has`) debes incrementar la cuenta que haya en el mapa.

Ahora viene el momento donde todo nuestro trabajo cobra sentido: cuando estés en el caso de Misplaced, debes consultar `userLetterToCount` para ver si has comprobado la letra antes. Si el número de veces que la has comprobado es igual al número de veces que dicha letra aparece en la solución tienes que marcar la letra como `Incorrect`. Ejemplo:

```javascript
solution = "HOUSE";
userInput = "METER";
// La primera "E" de "METER" será marcada como Misplaced, pero la segunda será marcada como Incorrecta!
```

Cuando uses el mapa, el bucle while que tienes se cambiara por un solo bucle for que iterará cada letra.

## ⚠️ Correciones importantes

-   Declara las funciones fuera del bucle porque si no se están redeclarando cada vez que el bucle se ejecuta

```javascript
for (let m = 0; m < guessesRemaining + 4; m++) {
    getUserInput(sol);

    function getUserInput(sol) {}

    function getWordReview(input, sol) {}
}
```

```javascript
function getUserInput(sol) {}

function getWordReview(input, sol) {}

for (let m = 0; m < guessesRemaining + 4; m++) {
    getUserInput(sol);
}
```

Algo parecido pasa con el array de soluciones. Imagina que el jugador jugase varias partidas - no hace falta declarar ese array cada vez. Mejor ponlo global.

-   Ahora mismo llamas a la siguiente función que necesitas dentro de en la que estás. Ejemplo (fijate en getWordReview):

```javascript
function getUserInput(sol) {
    let userInput = readline.question("Input a 5 letter word: ");
    let input = String(userInput).toUpperCase();
    getWordReview(input, sol);
}
```

Las funciones tienen que ser independientes entre sí. Devuele el valor de `getUserInput` y úsalo en `getWordReview`.

```javascript
function getUserInput() {
    let userInput = readline.question("Input a 5 letter word: ");
    return String(userInput).toUpperCase();
}

const userInput = getUserInput();
getWordReview(userInput, sol);
```

Ahora ya no necesitamos pasar sol a getUserInput así que la función en más sencilla.

Haz lo mismo en el resto de sitios donde pasa esto.

## 🎯 Detalles

-   Separa `getWordReview` en dos funciones: `getWordReview` y `getLetterReview`, que usarás en la primera función
-   Importa los módulos siguiendo la sintaxis de ES modules en vez de CommonJS

```javascript
const chalk = require("chalk");
const readline = require("readline-sync");
```

```javascript
import chalk from "chalk";
import readline from "readline-sync";
```

Para poder usar esta sintaxis he añadido
`"type: "module"` al `package.json`

-   Usa let o const en vez de var para evitar problemas de scope. Una variable que declaras fuera de una función no deberia estar disponible fuera de esta. Si este es el caso, lo más seguro es que deberías declarar esa variable fuera de la función.

-   Para imprimir las letras una al lado de otra en vez de arriba a abajo hay que usar `process.stdout.write` en vez de `console.log`.
-   Escríbelo todo en inglés
-   Pon los strings que usas en varios sitios (Correct, Incorrect, Misplaced) en constantes y usa esas constantes en vez de el texto directamente.
-   Llama a tus funciones en a parte de arriba del archivo y decláralas en la parte de abajo.
