"use strict";
// Chaining: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
const button = document.getElementById("btn");
const textInput = document.getElementById("textInput");
const titleElement = document.getElementById("title");
const phoneticsElement = document.getElementById("phonetics");
const definitionElement = document.getElementById("definition");
button.onclick = (ev) => {
    const word = textInput.value.toLowerCase();
    if (word == "") {
        return;
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((res) => {
        return res.json();
    })
        .then((entries) => {
        if (entries.length == 0) {
            return;
        }
        console.log(entries);
        titleElement.textContent =
            word.charAt(0).toUpperCase() + word.slice(1);
        if (entries instanceof Array) {
            definitionElement.textContent =
                entries[0].meanings[0].definitions[0].definition;
            phoneticsElement.textContent = entries[0].phonetic;
        }
        else {
            definitionElement.textContent = "Definition not found";
            phoneticsElement.textContent = "";
        }
    });
};
const DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2";
function fetchWordEntries(word) {
    return fetch(`${DICTIONARY_API_URL}/entries/en/${word}`).then((res) => {
        return res.json();
    });
}
function updateView(word, entries) {
    if (entries.length == 0) {
        return;
    }
    titleElement.textContent = word.charAt(0).toUpperCase() + word.slice(1);
    if (entries instanceof Array) {
        definitionElement.textContent =
            entries[0].meanings[0].definitions[0].definition;
        phoneticsElement.textContent = entries[0].phonetic;
    }
    else {
        definitionElement.textContent = "Definition not found";
        phoneticsElement.textContent = "";
    }
}
function test(word) {
    fetchWordEntries(word).then((entries) => {
        updateView(word, entries);
    });
}
