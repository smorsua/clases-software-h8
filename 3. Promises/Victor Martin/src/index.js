"use strict";
const POKE_API_URL = "https://pokeapi.co/api/v2";
function fetchPokemon(name) {
    fetch(`${POKE_API_URL}/pokemon/${name}`).then((res) => {
        return res.json().then((pokemonInfo) => {
            console.log(pokemonInfo);
        });
    });
}
fetchPokemon("ditto");
