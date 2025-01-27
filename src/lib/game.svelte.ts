import { IgtGame } from '$lib/game/IgtGame';
import { World } from '$lib/game/features/world/World.svelte';
import { Character } from '$lib/game/features/character/Character.svelte';
import { Bestiary } from '$lib/game/features/bestiary/Bestiary.svelte';
import { WorldBuilder } from '$lib/game/features/world/WorldBuilder';
import worldMap from '$lib/worldmap/maps/bigmode.json';
import type { TiledMap } from '$lib/util/tiled/types/TiledMap';
import { Powers } from '$lib/game/features/powers/Powers.svelte';
import { monsters } from '$lib/content/MonsterContent';
import { Soundtracks } from '$lib/game/features/soundtracks/Soundtracks.svelte';
import { soundtracks } from '$lib/content/SoundtrackContent';
import { Settings } from '$lib/game/features/settings/Settings.svelte';
import { powers } from '$lib/content/PowerContent';
import { KeyItems } from '$lib/game/features/keyitems/KeyItems.svelte';
import { keyItems } from '$lib/content/KeyItemContent';

// TODO(@Isha): Look into why height is missing somewhere?
export const map: TiledMap = worldMap as TiledMap;

const builder = new WorldBuilder(map);

const locations = builder.parseWorldLocations();
const roads = builder.parsePaths();

export const game = new IgtGame({
    character: new Character(),
    world: new World(locations, roads),
    powers: new Powers(powers),
    keyItems: new KeyItems(keyItems),
    bestiary: new Bestiary(monsters),
    soundtracks: new Soundtracks(soundtracks),
    settings: new Settings(),
});

game.initialize();
game.load();
game.start();

// TODO(@Isha): Maybe not here?
game.features.character.startRun();
