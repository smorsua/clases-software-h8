export type PokeAPIInfo = {
    stats: PokeAPIStats;
    abilities: PokeAPIAbilities;
    sprites: PokeAPISprites;
};

type PokeAPIStats = PokeAPIExpandedStat[];

type PokeAPIExpandedStat = {
    stat: PokeAPIStat;
};

type PokeAPIStat = { name: string; url: string };

type PokeAPIAbilities = PokeAPIExpandedAbility[];

type PokeAPIExpandedAbility = {
    ability: PokeAPIAbility;
};

type PokeAPIAbility = { name: string; url: string };

type PokeAPISprites = {
    front_default: string;
};
