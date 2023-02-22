"use strict";
exports.__esModule = true;
exports.PokedexViewHandler = void 0;
var index_1 = require("./index");
var PokedexViewHandler = /** @class */ (function () {
    function PokedexViewHandler() {
        this.button = document.getElementById("button");
        this.nameInput = document.getElementById("nameInput");
        this.photoElement = document.getElementById("photo");
        this.pokemonLevel = document.getElementById("pokemonLevel");
        this.pokemonExperience = document.getElementById("baseExperience");
        this.pokemonAttack = document.getElementById("pokemonAttack");
        this.pokemonDefense = document.getElementById("pokemonDefense");
        this.pokemonSpecialAttack = document.getElementById("pokemonSpecialAttack");
        this.pokemonSpecialDefense = document.getElementById("pokemonSpecialDefense");
        this.pokemonSpeed = document.getElementById("pokemonSpeed");
        this.pokemonAbilityName = document.getElementById("pokemonAbilityName");
        this.pokemonAbilityDescription = document.getElementById("pokemonAbilityDescription");
    }
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    PokedexViewHandler.prototype.handleClick = function () {
        var _this = this;
        var pokemonName = this.nameInput.value;
        var apiUrl = "https://pokeapi.co/api/v2/pokemon/".concat(pokemonName);
        this.button.onclick = function (ev) {
            var word = _this.nameInput.value.toLowerCase();
            if (word == "") {
                return;
            }
            else {
                fetch(apiUrl)
                    .then(function (response) { return response.json(); })
                    .then(function (data) {
                    return (0, index_1.pokeAPIToModels)(data);
                }).then(function (pokemon) {
                    _this.nameInput.textContent = pokemon.name;
                    _this.pokemonLevel.textContent = String(pokemon.level);
                    _this.pokemonExperience.textContent = String(pokemon.stats.health);
                    _this.pokemonAttack.textContent = String(pokemon.stats.attack);
                    _this.pokemonDefense.textContent = String(pokemon.stats.defense);
                    _this.pokemonSpecialAttack.textContent = String(pokemon.stats.specialAttack);
                    _this.pokemonSpecialDefense.textContent = String(pokemon.stats.specialDefense);
                    _this.pokemonSpeed.textContent = String(pokemon.stats.speed);
                    _this.pokemonAbilityName.textContent = pokemon.ability.name;
                    _this.pokemonAbilityDescription.textContent = pokemon.ability.description;
                });
            }
            ;
        };
    };
    PokedexViewHandler.prototype.updateView = function (pokemon) {
        this.nameInput.innerText = pokemon.name;
        this.photoElement.src = pokemon.photo;
        this.pokemonLevel.innerText = "Level: ".concat(pokemon.level);
        this.pokemonExperience.innerText = "Health: ".concat(pokemon.stats.health);
        this.pokemonAttack.innerText = "Attack: ".concat(pokemon.stats.attack);
        this.pokemonDefense.innerText = "Defense: ".concat(pokemon.stats.defense);
        this.pokemonSpecialAttack.innerText = "Special Attack: ".concat(pokemon.stats.specialAttack);
        this.pokemonSpecialDefense.innerText = "Special Defense: ".concat(pokemon.stats.specialDefense);
        this.pokemonSpeed.innerText = "Speed: ".concat(pokemon.stats.speed);
        this.pokemonAbilityName.innerText = pokemon.ability.name;
        this.pokemonAbilityDescription.innerText = pokemon.ability.description;
    };
    return PokedexViewHandler;
}());
exports.PokedexViewHandler = PokedexViewHandler;
