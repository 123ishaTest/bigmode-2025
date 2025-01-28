import type { Enemy } from '$lib/game/features/bestiary/Enemy.svelte';

export interface RunStats {
    damageDealt: number;
    damageTaken: number;
    monstersDefeated: number;
    locationsVisited: number;

    killer: Enemy;
}
