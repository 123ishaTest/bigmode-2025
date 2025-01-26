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
        id: PowerId.Deal5Damage,
        name: 'Deal 5 damage',
        requirement: { type: RequirementType.DamageDealt, amount: 5 },
        icon: 'powers/weapon-small.png',
        type: PowerType.Attack,
        baseBonus: 0.05,
        incrementBonus: 0.05,
        maxCount: Infinity,
    },
    {
        id: PowerId.Deal20Damage,
        name: 'Deal 20 damage',
        requirement: { type: RequirementType.DamageDealt, amount: 20 },
        icon: 'powers/weapon-axe.png',
        type: PowerType.Attack,
        baseBonus: 0.2,
        incrementBonus: 0.2,
        maxCount: Infinity,
    },
    {
        id: PowerId.Deal50Damage,
        name: 'Deal 50 damage',
        requirement: { type: RequirementType.DamageDealt, amount: 50 },
        icon: 'powers/weapon-halberd.png',
        type: PowerType.Attack,
        baseBonus: 0.5,
        incrementBonus: 0.5,
        maxCount: Infinity,
    },
    {
        id: PowerId.Take5Damage,
        name: 'Take 5 damage',
        requirement: { type: RequirementType.DamageTaken, amount: 5 },
        icon: '/powers/shield-small.png',
        type: PowerType.Defense,
        baseBonus: 0.05,
        incrementBonus: 0.05,
        maxCount: Infinity,
    },
    {
        id: PowerId.Take20Damage,
        name: 'Take 20 damage',
        requirement: { type: RequirementType.DamageTaken, amount: 20 },
        icon: '/powers/shield-medium.png',
        type: PowerType.Defense,
        baseBonus: 0.2,
        incrementBonus: 0.2,
        maxCount: Infinity,
    },
    {
        id: PowerId.Take50Damage,
        name: 'Take 50 damage',
        requirement: { type: RequirementType.DamageTaken, amount: 50 },
        icon: '/powers/shield-heroic.png',
        type: PowerType.Defense,
        baseBonus: 0.5,
        incrementBonus: 0.5,
        maxCount: Infinity,
    },
    {
        id: PowerId.Defeat1Monster,
        name: 'Defeat 1 monster',
        requirement: { type: RequirementType.MonstersDefeated, amount: 1 },
        icon: '/powers/skull-small.png',
        type: PowerType.Health,
        baseBonus: 0.05,
        incrementBonus: 0.05,
        maxCount: Infinity,
    },
    {
        id: PowerId.Defeat5Monsters,
        name: 'Defeat 5 monsters',
        requirement: { type: RequirementType.MonstersDefeated, amount: 5 },
        icon: '/powers/skull-medium.png',
        type: PowerType.Health,
        baseBonus: 0.1,
        incrementBonus: 0.1,
        maxCount: Infinity,
    },
    {
        id: PowerId.Visit3Locations,
        name: 'Visit 3 Locations',
        requirement: { type: RequirementType.LocationsVisited, amount: 3 },
        icon: '/powers/empty.png',
        type: PowerType.TravelSpeed,
        baseBonus: 0.1,
        incrementBonus: 0.1,
        maxCount: Infinity,
    },
    {
        id: PowerId.Visit3Locations,
        name: 'Visit 7 Locations',
        requirement: { type: RequirementType.LocationsVisited, amount: 7 },
        icon: '/powers/empty.png',
        type: PowerType.TravelSpeed,
        baseBonus: 0.2,
        incrementBonus: 0.2,
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
