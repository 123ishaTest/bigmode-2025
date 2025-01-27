import type { Character } from '$lib/game/features/character/Character.svelte';
import type { World } from '$lib/game/features/world/World.svelte';
import type { Bestiary } from '$lib/game/features/bestiary/Bestiary.svelte';
import type { Powers } from '$lib/game/features/powers/Powers.svelte';
import type { Soundtracks } from '$lib/game/features/soundtracks/Soundtracks.svelte';
import type { Settings } from '$lib/game/features/settings/Settings.svelte';
import type { KeyItems } from '$lib/game/features/keyitems/KeyItems.svelte';

export interface IgtFeatures {
    character: Character;
    world: World;
    powers: Powers;
    keyItems: KeyItems;
    bestiary: Bestiary;
    soundtracks: Soundtracks;
    settings: Settings;
}
