import { Pokemon } from "./myModels";
import { PokeAPIInfo } from "./apiModels";
import { pokeAPIToModels } from "./index";


export class PokedexViewHandler {
    private button = document.getElementById("btn") as HTMLButtonElement;
    private nameInput = document.getElementById("nameInput") as HTMLInputElement;
    private titleElement = document.getElementById("titleElement")!;
    private pokemonName = document.getElementById("pokemonName")!;
    private pokemonLevel = document.getElementById("pokemonLevel")!;
    private pokemonExperience = document.getElementById("baseExperience")!;
    private pokemonAttack = document.getElementById("pokemonAttack")!;
    private pokemonDefense = document.getElementById("pokemonDefense")!;
    private pokemonSpecialAttack = document.getElementById("pokemonSpecialAttack")!;
    private pokemonSpecialDefense = document.getElementById("pokemonSpeciañDefense")!;
    private pokemonSpeed = document.getElementById("pokemonSpeed")!;
    private pokemonAbilityName = document.getElementById("pokemonAbilityName")!;
    private pokemonAbilityDescription = document.getElementById("pokemonAbilityDescription")!;

    public updateView(models: Pokemon) {
        return;
    }


    public handleClick() {
        const pokemonName = this.nameInput.value;
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        

        this.button.onclick = (ev) => {
            const word = this.nameInput.value.toLowerCase();
        
            if (word == "") {
                return;
            }

            fetch(apiUrl)
            .then(response => response.json())
            .then(data: PokeAPIInfo => {
                const pokemon = pokeAPIToModels(data);
                
                // Update HTML elements with Pokemon data
                this.nameInput.textContent = pokemon.name;
                this.pokemonLevel.textContent = String(pokemon.level);
                this.pokemonExperience.textContent = String(pokemon.stats.health);
                this.pokemonAttack.textContent = String(pokemon.stats.attack);
                this.pokemonDefense.textContent = String(pokemon.stats.defense);
                this.pokemonSpecialAttack.textContent = String(pokemon.stats.speedAttack);
                this.pokemonSpecialDefense.textContent = String(pokemon.stats.speedDefense);
                this.pokemonSpeed.textContent = String(pokemon.stats.speed);
                this.pokemonAbilityName.textContent = pokemon.ability.name;
                this.pokemonAbilityDescription.textContent = pokemon.ability.description;
            });
        };
      
}