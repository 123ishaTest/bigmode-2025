import type { Enemy } from '$lib/game/features/bestiary/Enemy.svelte';

export interface CombatReport {
    playerWon: boolean;

    enemy: Enemy;

    damageDealt: number;
    damageTaken: number;
}
