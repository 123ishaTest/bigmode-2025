import type { TiledLayer } from '$lib/util/tiled/types/layers/TiledLayer';
import type { TiledObject } from '$lib/util/tiled/types/objects/TiledObject';

export interface ObjectGroup extends TiledLayer {
    draworder: string;
    objects: TiledObject[];
}
