/**
 * PREGUNTAS:
 * como hacer el documento aparte con todos los valores y así no tneer que buscar
 * como pasar este file a javascript
 *
 * COSAS QUE ME FALTAN:
 *
 *
 */
var button = document.getElementById("btn");
var nameInput = document.getElementById("nameInput");
var titleElement = document.getElementById("titleElement");
var pokemonName = document.getElementById("pokemonName");
var pokemonLevel = document.getElementById("pokemonLevel");
var pokemonExperience = document.getElementById("baseExperience");
var pokemonAttack = document.getElementById("pokemonAttack");
var pokemonDefense = document.getElementById("pokemonDefense");
var pokemonSpecialAttack = document.getElementById("pokemonSpecialAttack");
var pokemonSpecialDefense = document.getElementById("pokemonSpeciañDefense");
var pokemonSpeed = document.getElementById("pokemonSpeed");
var pokemonAbilityName = document.getElementById("pokemonAbilityName");



button.onclick = function (ev) {
    var word = nameInput.value.toLowerCase();
    if (word == "") {
        return;
    }
    fetch("https://api.dictionaryapi.dev/api/v2/".concat(word), {})
        .then(function (res) {
        return res.json();
    })
        .then(function (entries) {
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
        }
        else {
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
var DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2";
function fetchInput(word) {
    return fetch("".concat(DICTIONARY_API_URL, "/entries/en/").concat(word)).then(function (res) {
        return res.json();
    });
}
function reload(word, entries) {
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
    }
    else {
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
function generateCard(word) {
    fetchInput(word).then(function (entries) {
        reload(word, entries);
    });
}
