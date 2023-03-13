const POKE_API_URL = "https://pokeapi.co/api/v2";

//Elementos Info Pokemon
const pokemonName = document.getElementById("pokemonName") as HTMLElement;
const pokemonid = document.getElementById("pokemonid") as HTMLElement;
const pokemonLevel = document.getElementById("pokemonLevel") as HTMLElement;
const pokemonSprite = document.getElementById("pokemonSprite") as HTMLElement;
const attackLine = document.getElementById("attack") as HTMLElement;
const defenseLine = document.getElementById("defense") as HTMLElement;
const specialAtkLine = document.getElementById("specialAtk") as HTMLElement;
const specialDefLine = document.getElementById("specialDef") as HTMLElement;
const speedLine = document.getElementById("speed") as HTMLElement;
const healthLine = document.getElementById("health") as HTMLElement;
const currentExpInfo = document.getElementById("currentExp") as HTMLElement;
const nextLevelExpInfo = document.getElementById("nextLevelExp") as HTMLElement;
const abilityName = document.getElementById("abilityName") as HTMLElement;
const abilityDescription = document.getElementById(
    "description"
) as HTMLElement;

//Elementos interactivos
const button = document.getElementById("button") as HTMLButtonElement;
const nameInput = document.getElementById("nameInput") as HTMLInputElement;

button.onclick = (ev) => {
    const name = nameInput.value.toLowerCase();

    if (name == "") {
        return;
    } else {
        pokemonName!.textContent = name;
        displayPokeInfo(name);
    }
};

import { Pokemon } from "./models";
import { Poke_Api_types } from "./addapters";

function fetchPokemon(name: string) {
    return fetch(`${POKE_API_URL}/pokemon/${name}`).then((res) => {
        return res.json();
    });
}

function updateData(name: string, pokemonInfo: any) {
    if (pokemonInfo.length == 0) {
        return;
    } else {
        if (pokemonInfo instanceof Object) {
            pokemonName!.textContent =
                name.charAt(0).toUpperCase() + name.slice(1);
            pokemonid!.innerText = "id." + pokemonInfo.id;
            let randomlvl = Math.floor(Math.random() * 100);
            pokemonLevel!.textContent = "LVL." + randomlvl.toString();
            pokemonSprite!.setAttribute(
                "src",
                pokemonInfo.sprites.front_default
            );
            healthLine!.textContent = "HP: " + pokemonInfo.stats[0].base_stat;
            attackLine!.textContent = "ATK: " + pokemonInfo.stats[1].base_stat;
            defenseLine!.textContent = "DEF: " + pokemonInfo.stats[2].base_stat;
            specialAtkLine!.textContent =
                "SATK: " + pokemonInfo.stats[3].base_stat;
            specialDefLine!.textContent =
                "SDEF: " + pokemonInfo.stats[4].base_stat;
            speedLine!.textContent = "SPE: " + pokemonInfo.stats[5].base_stat;
            let nextlvlexp = Math.floor(Math.random() * 100000);
            let currexp = Math.floor(Math.random() * nextlvlexp);

            currentExpInfo!.textContent =
                "Current Experience: " + currexp.toString();
            nextLevelExpInfo!.textContent =
                "Experience to new level: " + nextlvlexp.toString();
            abilityName!.textContent =
                "Ability name: " +
                pokemonInfo.abilities[0].ability.name.toUpperCase();
            const descURL: string = pokemonInfo.abilities[0].ability.url;
            getDescription(descURL, "en");
        } else {
            pokemonid!.textContent = "";
            pokemonLevel!.textContent = "";
            pokemonSprite!.textContent = "";
            healthLine!.textContent = "";
            attackLine!.textContent = "";
            defenseLine!.textContent = "";
            specialAtkLine!.textContent = "";
            specialDefLine!.textContent = "";
            speedLine!.textContent = "";
            currentExpInfo!.textContent = "";
            nextLevelExpInfo!.textContent = "";
            abilityName!.textContent = "";
            abilityDescription!.textContent = "";
        }
    }
}

function displayPokeInfo(name: string) {
    fetchPokemon(name).then((pokemonInfo: any[]) => {
        console.log(pokemonInfo);
        updateData(name, pokemonInfo);
    });
}

const getDescription = async (descURL: string, lang = "en") => {
    const dataList = await fetch(descURL).then((response) => response.json());

    if (dataList) {
        for (const entry in dataList) {
            if (entry === "flavor_text_entries") {
                for (const flavor in dataList[`${entry}`]) {
                    if (
                        dataList[`${entry}`][`${flavor}`]["language"].name ===
                        `${lang}`
                    ) {
                        abilityDescription!.textContent =
                            dataList[`${entry}`][`${flavor}`].flavor_text;
                    }
                }
            }
        }
    } else {
        console.log("No data!");
    }
};
