export type Poke_Api_types = {
    abilities: {
        ability: { abilityName: string }[];
        is_hidden: boolean;
        slot: number;
    };
    base_experience: number;

    forms: {
        name: string;
        url: URL;
    };

    game_indices: {
        game_index: number;
        version: [Object];
    };

    height: number;

    held_items: {
        item: [Object];
        version_details: [Array<Element>]; // no estoy seguro del contenido del array
    };

    id: number;
    is_default: boolean;
    location_area_encounters: URL;

    moves: {
        move: [Object];
        version_group_details: [Array<Element>];
    };

    name: string;
    order: number;
    past_types: null[];

    species: {
        name: string;
        url: URL;
    };

    sprites: {
        back_default: URL;
        front_default: URL;
    };

    other: {
        dream_world: [Object];
        home: [Object];
        official_artwork: [Object];
    };

    version: {
        "generation-i": [Object];
        "generation-ii": [Object];
        "generation-iii": [Object];
        "generation-iv": [Object];
        "generation-v": [Object];
        "generation-vi": [Object];
        "generation-vii": [Object];
        "generation-viii": [Object];
    };

    stats: {
        base_stat: number;
        effort: number;
        stat: [Object];
    };

    types: {
        slot: number;
        type: [Object];
    };

    weight: number;
};
