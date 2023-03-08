const POKE_API_URL = "https://pokeapi.co/api/v2";
//Elementos Info Pokemon
const pokemonName = document.getElementById("pokemonName");
const pokemonid = document.getElementById("pokemonid");
const pokemonLevel = document.getElementById("pokemonLevel");
const pokemonSprite = document.getElementById("pokemonSprite");
const attackLine = document.getElementById("attack");
const defenseLine = document.getElementById("defense");
const specialAtkLine = document.getElementById("specialAtk");
const specialDefLine = document.getElementById("specialDef");
const speedLine = document.getElementById("speed");
const healthLine = document.getElementById("health");
const currentExpInfo = document.getElementById("currentExp");
const nextLevelExpInfo = document.getElementById("nextLevelExp");
const abilityName = document.getElementById("abilityName");
const abilityDescription = document.getElementById("description");
//Elementos interactivos
const button = document.getElementById("button");
const nameInput = document.getElementById("nameInput");
button.onclick = (ev) => {
    const name = nameInput.value.toLowerCase();
    if (name == "") {
        return;
    } else {
        pokemonName.textContent = name;
        displayPokeInfo(name);
    }
};
function fetchPokemon(name) {
    return fetch(`${POKE_API_URL}/pokemon/${name}`).then((res) => {
        return res.json();
    });
}
function updateData(name, pokemonInfo) {
    if (pokemonInfo.length == 0) {
        return;
    } else {
        pokemonName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        if (pokemonInfo instanceof Array) {
            pokemonid.textContent = pokemonInfo[0].id[0];
            let randomlvl = Math.random() * 100;
            pokemonLevel.textContent = randomlvl.toString();
            pokemonSprite.setAttribute("src", pokemonInfo[0].sprites[4]);
            healthLine.textContent = pokemonInfo[0].stats[0].stat[0];
            attackLine.textContent = pokemonInfo[0].stats[1].stat[0];
            defenseLine.textContent = pokemonInfo[0].stats[2].stat[0];
            specialAtkLine.textContent = pokemonInfo[0].stats[3].stat[0];
            specialDefLine.textContent = pokemonInfo[0].stats[4].stat[0];
            speedLine.textContent = pokemonInfo[0].stats[5].stat[0];
            let nextlvlexp = Math.random() * 100000;
            let currexp = Math.random() * nextlvlexp;
            currentExpInfo.textContent = currexp.toString();
            nextLevelExpInfo.textContent = nextlvlexp.toString();
            abilityName.textContent = pokemonInfo[0].abilities[0].ability[0];
            abilityDescription.textContent =
                pokemonInfo[0].abilities[0].ability[1];
        } else {
            pokemonid.textContent = "Default";
            pokemonLevel.textContent = "Default";
            pokemonSprite.textContent = "Image not Found";
            healthLine.textContent = "Default";
            attackLine.textContent = "Default";
            defenseLine.textContent = "Default";
            specialAtkLine.textContent = "Default";
            specialDefLine.textContent = "Default";
            speedLine.textContent = "Default";
            currentExpInfo.textContent = "Default";
            nextLevelExpInfo.textContent = "Default";
            abilityName.textContent = "Default";
            abilityDescription.textContent = "Default";
        }
    }
}
function displayPokeInfo(name) {
    fetchPokemon(name).then((pokemonInfo) => {
        console.log(pokemonInfo);
        updateData(name, pokemonInfo);
    });
}
export {};
