import type { IgtWallet } from '$lib/game/features/wallet/IgtWallet';
import type { Character } from '$lib/game/features/character/Character.svelte';
import type { World } from '$lib/game/features/world/World.svelte';
import type { Bestiary } from '$lib/game/features/bestiary/Bestiary';

export interface IgtFeatures {
    character: Character;
    world: World;
    bestiary: Bestiary;
    wallet: IgtWallet;
}
