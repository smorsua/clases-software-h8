

/**
 * PREGUNTAS:
 * como hacer el documento aparte con todos los valores y así no tneer que buscar
 * como pasar este file a javascript
 * 
 * COSAS QUE ME FALTAN:
 * 
 * 
 */


const button = document.getElementById("btn") as HTMLButtonElement;
const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const titleElement = document.getElementById("titleElement")!;
const pokemonName = document.getElementById("pokemonName")!;
const pokemonLevel = document.getElementById("pokemonLevel")!;
const pokemonExperience = document.getElementById("baseExperience")!;
const pokemonAttack = document.getElementById("pokemonAttack")!;
const pokemonDefense = document.getElementById("pokemonDefense")!;
const pokemonSpecialAttack = document.getElementById("pokemonSpecialAttack")!;
const pokemonSpecialDefense = document.getElementById("pokemonSpeciañDefense")!;
const pokemonSpeed = document.getElementById("pokemonSpeed")!;
const pokemonAbilityName = document.getElementById("pokemonAbilityName")!;

button.onclick = (ev) => {
    const word = nameInput.value.toLowerCase();

    if (word == "") {
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/${word}`, {
    })
        .then((res) => {
            return res.json();
        })
        .then((entries: any[]) => {
            if (entries.length == 0) {
                return;
            }
            
            console.log(entries);
            pokemonName.textContent =
                 word.charAt(0).toUpperCase() + word.slice(1);

            if (entries instanceof Array) {
                pokemonExperience.textContent = 
                    entries[0].stats[0].stat[1];
                pokemonAttack.textContent = 
                    entries[0].stats[1].stat[1];
                pokemonDefense.textContent =
                    entries[0].stats[2].stat[1];
                pokemonSpecialAttack.textContent =
                    entries[0].stats[3].stat[1];
                pokemonSpecialDefense.textContent =
                    entries[0].stats[4].stat[1];
                pokemonSpeed.textContent =
                    entries[0].stats[5].stat[1];
                pokemonAbilityName.textContent =
                    entries[0].abilities[0].ability[0];
            } else {
                pokemonAbilityName.textContent = "";
                pokemonAttack.textContent = "";
                pokemonDefense.textContent = "";
                pokemonExperience.textContent = "";
                pokemonLevel.textContent = "";
                pokemonSpecialAttack.textContent = "";
                pokemonSpecialDefense.textContent = "";
                pokemonSpeed.textContent = "";
            }
            
        });
};

const DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2";


function fetchInput(word: string) {
    return fetch(`${DICTIONARY_API_URL}/entries/en/${word}`).then((res) => {
        return res.json();
    });
}

function reload(word: string, entries: any[]) {
    if (entries.length == 0) {
        return;
    }
    pokemonName.textContent =
                 word.charAt(0).toUpperCase() + word.slice(1);

            if (entries instanceof Array) {
                pokemonExperience.textContent = 
                    entries[0].stats[0].stat[1];
                pokemonAttack.textContent = 
                    entries[0].stats[1].stat[1];
                pokemonDefense.textContent =
                    entries[0].stats[2].stat[1];
                pokemonSpecialAttack.textContent =
                    entries[0].stats[3].stat[1];
                pokemonSpecialDefense.textContent =
                    entries[0].stats[4].stat[1];
                pokemonSpeed.textContent =
                    entries[0].stats[5].stat[1];
                pokemonAbilityName.textContent =
                    entries[0].abilities[0].ability[0];
            } else {
                pokemonAbilityName.textContent = "";
                pokemonAttack.textContent = "";
                pokemonDefense.textContent = "";
                pokemonExperience.textContent = "";
                pokemonLevel.textContent = "";
                pokemonSpecialAttack.textContent = "";
                pokemonSpecialDefense.textContent = "";
                pokemonSpeed.textContent = "";
            }
}

function generateCard(word: string) {
    fetchInput(word).then((entries) => {
        reload(word, entries);
    });
}
