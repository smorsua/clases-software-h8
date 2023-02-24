

export type Pokemon = {
    name: string;
    photo: string;
    level: number;
    stats: Stats;
    ability: Ability;
}

export type Stats = {
    health: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    experiencePoints: number;
}

export type Ability = {
    name: string;
    description: string;
}