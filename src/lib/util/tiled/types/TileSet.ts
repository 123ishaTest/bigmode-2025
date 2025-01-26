/**
 * Wangsets are ignored for now.
 * Note that imageCache and firstGid need to be injected from the map when loading the TileSet.
 */
export interface TileSet {
    firstgid: number;
    imageCache: HTMLImageElement;
    columns: number;
    editorsettings?: {
        export: {
            format: string;
            target: string;
        };
    };
    image: string;
    imageheight: number;
    imagewidth: number;
    margin: number;
    name: string;
    spacing: number;
    tilecount: number;
    tiledversion: string;
    tileheight: number;
    tiles?: [
        {
            id: number;
            probability: number;
        },
    ];
    tilewidth: number;
    type: string;
    version: string;
}
