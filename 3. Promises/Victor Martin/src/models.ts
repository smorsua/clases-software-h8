export type Pokemon = {
    name: string;
    id: number;
    stats: Stats;
    level: number;
    exp: ExpInfo;
    ability: Ability;
    sprite: string;
};

type Stats = {
    attack: number;
    defense: number;
    specialAtk: number;
    specialDef: number;
    speed: number;
    health: number;
};

type ExpInfo = {
    currentExp: number;
    nextLevelExp: number;
};

type Ability = {
    name: string;
    description: string;
};

//type AbilityAPI = {
//    name:string;
//}
