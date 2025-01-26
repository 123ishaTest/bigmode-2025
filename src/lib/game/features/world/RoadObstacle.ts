import type { EnemyDetail } from '$lib/game/features/bestiary/EnemyDetail';

export interface RoadObstacle {
    distance: number;
    obstacle: EnemyDetail;
}
