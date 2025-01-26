import type { TiledLayer } from '$lib/util/tiled/types/layers/TiledLayer';

export interface TileLayer extends TiledLayer {
    data: number[];
}
