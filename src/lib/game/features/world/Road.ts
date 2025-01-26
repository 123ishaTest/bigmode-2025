import type { RoadId } from '$lib/content/RoadId';
import type { WorldLocationId } from '$lib/content/WorldLocationId';
import type { RoadObstacle } from '$lib/game/features/world/RoadObstacle';
import type { WorldPosition } from '$lib/util/tiled/types/WorldPosition';

export interface Road {
    id: RoadId;
    from: WorldLocationId;
    to: WorldLocationId;
    obstacles: RoadObstacle[];
    duration: number;
    position: WorldPosition;
    path: WorldPosition[];
}
