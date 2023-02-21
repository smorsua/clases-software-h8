import { Pokemon } from "./myModels";
import { Stats } from "./myModels";
import { PokeAPIInfo } from "./apiModels";
import { PokedexViewHandler } from "./handler";

function fetchPokemon(name: string): Promise<PokeAPIInfo> {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            const stats = data.stats.map((stat: any) => ({
                stat: {
                    name: stat.stat.name,
                    url: stat.stat.url,
                },
            }));
            const abilities = data.abilities.map((ability: any) => ({
                ability: {
                    name: ability.ability.name,
                    url: ability.ability.url,
                },
            }));
            const sprites = {
                front_default: data.sprites.front_default,
            };
            return { name, stats, abilities, sprites };
        });
}

export function pokeAPIToModels(info: PokeAPIInfo): Promise<Pokemon> {
    const stats: Stats = {
        health: 0,
        attack: 0,
        defense: 0,
        speedAttack: 0,
        speedDefense: 0,
        speed: 0,
        experiencePoints: 0,
    };

    info.stats.forEach((stat) => {
        switch (stat.stat.name) {
            case "hp":
                stats.health = parseInt(stat.stat.url.split("/").slice(-1)[0]);
                break;
            case "attack":
                stats.attack = parseInt(stat.stat.url.split("/").slice(-1)[0]);
                break;
            case "defense":
                stats.defense = parseInt(stat.stat.url.split("/").slice(-1)[0]);
                break;
            case "special-attack":
                stats.speedAttack = parseInt(
                    stat.stat.url.split("/").slice(-1)[0]
                );
                break;
            case "special-defense":
                stats.speedDefense = parseInt(
                    stat.stat.url.split("/").slice(-1)[0]
                );
                break;
            case "speed":
                stats.speed = parseInt(stat.stat.url.split("/").slice(-1)[0]);
                break;
            default:
                break;
        }
    });

    const ability = {
        name: info.abilities[0].ability.name,
        description: "",
    };

    return fetch(info.abilities[0].ability.url)
        .then((res) => res.json())
        .then((pokeData) => {
            const pokemon: Pokemon = {
                name: "", //AQUÍ!!!
                photo: info.sprites.front_default,
                level: 5,
                stats: stats,
                ability: ability,
            };
            return pokemon;
        });
}
