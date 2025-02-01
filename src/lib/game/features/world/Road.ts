import type { RoadId } from '$lib/content/RoadId';
import type { WorldLocationId } from '$lib/content/WorldLocationId';
import type { WorldPosition } from '$lib/util/tiled/types/WorldPosition';
import type { RoadObstacle } from '$lib/game/features/world/RoadObstacle';

export interface Road {
    id: RoadId;
    from: WorldLocationId;
    to: WorldLocationId;
    obstacles: RoadObstacle[];
    duration: number;
    path: WorldPosition[];
}
