import { IgtGame } from '$lib/game/IgtGame';
import { CurrencyType } from '$lib/game/features/wallet/CurrencyType';
import { IgtWallet } from '$lib/game/features/wallet/IgtWallet';
import { World } from '$lib/game/features/world/World.svelte';
import { Character } from '$lib/game/features/character/Character.svelte';
import { Bestiary } from '$lib/game/features/bestiary/Bestiary';
import { WorldBuilder } from '$lib/game/features/world/WorldBuilder';
import worldMap from '$lib/worldmap/maps/bigmode.json';
import type { TiledMap } from '$lib/util/tiled/types/TiledMap';

export const map: TiledMap = worldMap;

const builder = new WorldBuilder(worldMap);

const locations = builder.parseWorldLocations();
const roads = builder.parsePaths();

console.log(locations);
console.log(roads);
export const game = new IgtGame({
    character: new Character(),
    world: new World(locations, roads),
    bestiary: new Bestiary(),
    wallet: new IgtWallet([CurrencyType.Gold, CurrencyType.Ore, CurrencyType.Bark]),
});

game.initialize();
game.start();
