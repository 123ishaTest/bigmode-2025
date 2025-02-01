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

import { default as mosquitoImg } from '$lib/monsters/mosquito.png';
import { default as camelImg } from '$lib/monsters/camel.png';
import { default as snakeImg } from '$lib/monsters/snake.png';
import { default as crocodileImg } from '$lib/monsters/crocodile.png';
import { default as scorpionImg } from '$lib/monsters/scorpion.png';
import { default as mummyImg } from '$lib/monsters/mummy.png';
import { default as batImg } from '$lib/monsters/bat.png';
import { default as goatImg } from '$lib/monsters/goat.png';
import { default as rockCrabImg } from '$lib/monsters/rock-crab.png';
import { default as wolfImg } from '$lib/monsters/wolf.png';
import { default as skeletonImg } from '$lib/monsters/skeleton.png';
import { default as giantImg } from '$lib/monsters/giant.png';
import { default as chickenImg } from '$lib/monsters/chicken.png';
import { default as cowImg } from '$lib/monsters/cow.png';
import { default as goblinImg } from '$lib/monsters/goblin.png';
import { default as riverSpiritImg } from '$lib/monsters/river-spirit.png';
import { default as trollImg } from '$lib/monsters/troll.png';
import { default as dragonImg } from '$lib/monsters/dragon.png';
import { default as owlImg } from '$lib/monsters/owl.png';
import { default as spiderImg } from '$lib/monsters/spider.png';
import { default as slimeImg } from '$lib/monsters/slime.png';
import { default as hauntedTreeImg } from '$lib/monsters/hauntedTree.png';
import { default as witchImg } from '$lib/monsters/witch.png';
import { default as giantSpiderImg } from '$lib/monsters/giantSpider.png';

import type { TileSet } from '$lib/util/tiled/types/TileSet';

export const Images: Record<string, string> = {
    grass: grassImg,
    fence: fenceImg,
    scenery: sceneryImg,
    house: houseImg,
    rogue: rogueImg,
    character: characterImg,
};

export const MonsterImages: Record<string, string> = {
    mosquito: mosquitoImg,
    camel: camelImg,
    snake: snakeImg,
    crocodile: crocodileImg,
    scorpion: scorpionImg,
    mummy: mummyImg,
    bat: batImg,
    goat: goatImg,
    rockCrab: rockCrabImg,
    wolf: wolfImg,
    skeleton: skeletonImg,
    giant: giantImg,
    chicken: chickenImg,
    cow: cowImg,
    goblin: goblinImg,
    riverSpirit: riverSpiritImg,
    troll: trollImg,
    dragon: dragonImg,
    owl: owlImg,
    spider: spiderImg,
    slime: slimeImg,
    hauntedTree: hauntedTreeImg,
    witch: witchImg,
    giantSpider: giantSpiderImg,
};
