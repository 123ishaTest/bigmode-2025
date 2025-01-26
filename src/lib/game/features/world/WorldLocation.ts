import type { WorldLocationId } from '$lib/content/WorldLocationId';
import type { WorldPosition } from '$lib/util/tiled/types/WorldPosition';

export interface WorldLocation {
    id: WorldLocationId;
    name: string;

    // TODO(@Isha): Parse from Tiled
    position: WorldPosition;
}
