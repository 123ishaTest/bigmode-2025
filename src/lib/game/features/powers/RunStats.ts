import type { Enemy } from '$lib/game/features/bestiary/Enemy.svelte';
import type { WorldLocationId } from '$lib/content/WorldLocationId';

export interface RunStats {
    damageDealt: number;
    damageTaken: number;
    monstersDefeated: number;
    locationsVisited: WorldLocationId[];

    killer?: Enemy;
}
