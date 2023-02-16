const POKE_API_URL = "https://pokeapi.co/api/v2";

const pokemonid = null;
const pokemonLevel = null;
const pokemonSprite = null;
const attackLine = null;
const defenseLine = null;
const speedAtkLine = null;
const speedDefLine = null;
const speedLine = null;
const healthLine = null;
const currentExpInfo = null;
const nextLevelExpInfo = null;
const abilityName = null;
const abilityDescription = null;

function initData() {
    // Esta función podría inizializar las const de arriba
}

function fetchPokemon(name: string) {
    fetch(`${POKE_API_URL}/pokemon/${name}`).then((res) => {
        return res.json();
    });
}

function updateData(name: string, pokemonInfo: string | any[]) {
    if (pokemonInfo.length == 0) {
        return;
    } else {
        pokemonid.id = pokemonInfo[6];
        pokemonLevel.level = //número random
            pokemonSprite.sprite = pokemonInfo[14].front_default;
        attackLine.attack = pokemonInfo[17].base_stat[0];
        defenseLine.defense = pokemonInfo[17].base_stat[1];
        speedAtkLine.speedAtk = pokemonInfo[17].base_stat[2];
        speedDefLine.speedDef = pokemonInfo[17].base_stat[3];
        healthLine.health = pokemonInfo[17].base_stat[4];
        currentExpInfo.currentExp = //número random entre anterior nivel y siguiente
            nextLevelExpInfo.nextLevelExp = pokemonInfo[1];
        abilityName.ability = pokemonInfo[0].ability[0]; // no se si esto y la linea siguiente tiene sentido
        abilityDescription.description = pokemonInfo[0].ability[1];
    }
}

function test(name: string) {
    initData();
    fetchPokemon(name).then((pokemonInfo: string | any[]) => {
        updateData(name, pokemonInfo);
    });
}

test("ditto");
