import type { MonsterId } from '$lib/game/features/bestiary/MonsterId';

export interface EnemyDetail {
    monster: MonsterId;
    level: number;
}
