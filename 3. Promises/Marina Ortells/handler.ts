import { Pokemon } from "./myModels";
import { PokeAPIInfo } from "./apiModels";
import { pokeAPIToModels } from "./index";


export class PokedexViewHandler {
    private button = document.getElementById("button") as HTMLButtonElement;
    private nameInput = document.getElementById("nameInput") as HTMLInputElement;
    private photoElement = document.getElementById("photo") as HTMLImageElement;
    private pokemonLevel = document.getElementById("pokemonLevel") as HTMLElement;
    private pokemonExperience = document.getElementById("baseExperience") as HTMLElement;
    private pokemonAttack = document.getElementById("pokemonAttack") as HTMLElement;;
    private pokemonDefense = document.getElementById("pokemonDefense") as HTMLElement;;
    private pokemonSpecialAttack = document.getElementById("pokemonSpecialAttack") as HTMLElement;;
    private pokemonSpecialDefense = document.getElementById("pokemonSpecialDefense") as HTMLElement;;
    private pokemonSpeed = document.getElementById("pokemonSpeed") as HTMLElement;;
    private pokemonAbilityName = document.getElementById("pokemonAbilityName") as HTMLElement;;
    private pokemonAbilityDescription = document.getElementById("pokemonAbilityDescription") as HTMLElement;;


    
    public handleClick() {
        const pokemonName = this.nameInput.value;
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        

        this.button.onclick = (ev) => {
            const word = this.nameInput.value.toLowerCase();
        
            if (word == "") {
                return;
            }

            else {
                fetch(apiUrl)
                .then(response => response.json())
                .then((data: PokeAPIInfo) => {
                    return pokeAPIToModels(data);                            
                }).then((pokemon: Pokemon)=>{
                    this.nameInput.textContent = pokemon.name;
                    this.pokemonLevel.textContent = String(pokemon.level);
                    this.pokemonExperience.textContent = String(pokemon.stats.health);
                    this.pokemonAttack.textContent = String(pokemon.stats.attack);
                    this.pokemonDefense.textContent = String(pokemon.stats.defense);
                    this.pokemonSpecialAttack.textContent = String(pokemon.stats.specialAttack);
                    this.pokemonSpecialDefense.textContent = String(pokemon.stats.specialDefense);
                    this.pokemonSpeed.textContent = String(pokemon.stats.speed);
                    this.pokemonAbilityName.textContent = pokemon.ability.name;
                    this.pokemonAbilityDescription.textContent = pokemon.ability.description;
                });
        };

    }
}

    public updateView(pokemon: Pokemon): void {
        this.nameInput.innerText = pokemon.name;
        this.photoElement.src = pokemon.photo;
        this.pokemonLevel.innerText = `Level: ${pokemon.level}`;
        this.pokemonExperience.innerText = `Health: ${pokemon.stats.health}`;
        this.pokemonAttack.innerText = `Attack: ${pokemon.stats.attack}`;
        this.pokemonDefense.innerText = `Defense: ${pokemon.stats.defense}`;
        this.pokemonSpecialAttack.innerText = `Special Attack: ${pokemon.stats.specialAttack}`;
        this.pokemonSpecialDefense.innerText = `Special Defense: ${pokemon.stats.specialDefense}`;
        this.pokemonSpeed.innerText = `Speed: ${pokemon.stats.speed}`;
        this.pokemonAbilityName.innerText = pokemon.ability.name;
        this.pokemonAbilityDescription.innerText = pokemon.ability.description;
    }
    
}