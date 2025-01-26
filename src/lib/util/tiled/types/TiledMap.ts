import type { TiledLayer } from '$lib/util/tiled/types/layers/TiledLayer';

export interface TiledMap {
    compressionlevel: number;
    editorsettings?: {
        export: {
            target: string;
        };
    };
    height: number;
    infinite: boolean;
    layers: TiledLayer[];
    nextlayerid: number;
    nextobjectid: number;
    orientation: string;
    renderorder: string;
    tiledversion: string;
    tileheight: number;
    tilesets: {
        firstgid: number;
        source: string;
    }[];
    tilewidth: number;
    type: string;
    version: string;
    width: number;
}
