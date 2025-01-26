import type { Character } from '$lib/game/features/character/Character.svelte';
import type { World } from '$lib/game/features/world/World.svelte';
import type { Bestiary } from '$lib/game/features/bestiary/Bestiary';
import type { Powers } from '$lib/game/features/powers/Powers.svelte';

export interface IgtFeatures {
    character: Character;
    world: World;
    powers: Powers;
    bestiary: Bestiary;
}
