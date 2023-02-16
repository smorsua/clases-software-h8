

type Pokemon = {
    name: string;
    photo: string;
    level: number;
    stats: Stats;
    ability: Ability;
}

type Stats = {
    health: number;
    attack: number;
    defense: number;
    speedAttack: number;
    speedDefense: number;
    speed: number;
    experiencePoints: number;
    nextLevelExperiencePoints: number;
}

type Ability = {
    name: string;
    description: string;
}

