import grass from './grass.json';
import house from './house.json';
import fence from './fence.json';
import scenery from './scenery.json';
import rogue from './rogue.json';

export const TileSets: Record<string, Omit<TileSet, 'firstgid' | 'imageCache' | 'tiles'>> = {
    grass: grass,
    fence: fence,
    scenery: scenery,
    house: house,
    rogue: rogue,
};

import { default as grassImg } from './grass.png';
import { default as fenceImg } from './fence.png';
import { default as houseImg } from './house.png';
import { default as sceneryImg } from './scenery.png';
import { default as rogueImg } from './rogue.png';
import { default as characterImg } from './character.png';
import type { TileSet } from '$lib/util/tiled/types/TileSet';

export const Images: Record<string, string> = {
    grass: grassImg,
    fence: fenceImg,
    scenery: sceneryImg,
    house: houseImg,
    rogue: rogueImg,
    character: characterImg,
};
