import { IgtGame } from '$lib/game/IgtGame';
import { CurrencyType } from '$lib/game/features/wallet/CurrencyType';
import { IgtWallet } from '$lib/game/features/wallet/IgtWallet';
import { World } from '$lib/game/features/world/World.svelte';
import { Character } from '$lib/game/features/character/Character.svelte';
import { Bestiary } from '$lib/game/features/bestiary/Bestiary';
import { WorldBuilder } from '$lib/game/features/world/WorldBuilder';
import worldMap from '$lib/worldmap/maps/bigmode.json';
import type { TiledMap } from '$lib/util/tiled/types/TiledMap';
import type { Power } from '$lib/game/features/powers/Power';
import { PowerType } from '$lib/game/features/powers/PowerType';
import { Powers } from '$lib/game/features/powers/Powers.svelte';
import { PowerId } from '$lib/game/features/powers/PowerId';
import { RequirementType } from '$lib/game/tools/requirements/RequirementType';

export const map: TiledMap = worldMap;

const builder = new WorldBuilder(worldMap);

const locations = builder.parseWorldLocations();
const roads = builder.parsePaths();

const powers: Power[] = [
    {
        id: PowerId.Deal1Damage,
        name: 'Deal 1 damage',
        requirement: { type: RequirementType.DamageDealt, amount: 1 },
        icon: 'TEMP',
        type: PowerType.Attack,
        baseBonus: 0.01,
        incrementBonus: 0.01,
        maxCount: Infinity,
    },
    {
        id: PowerId.Deal100Damage,
        name: 'Deal 100 damage',
        requirement: { type: RequirementType.DamageDealt, amount: 100 },
        icon: 'TEMP',
        type: PowerType.Attack,
        baseBonus: 0.01,
        incrementBonus: 0.01,
        maxCount: Infinity,
    },
];

export const game = new IgtGame({
    character: new Character(),
    world: new World(locations, roads),
    powers: new Powers(powers),
    bestiary: new Bestiary(),
    wallet: new IgtWallet([CurrencyType.Gold, CurrencyType.Ore, CurrencyType.Bark]),
});

game.initialize();
game.start();

// TODO(@Isha): Maybe not here?
game.features.character.startRun();
