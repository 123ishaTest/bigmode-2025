import type { ObjectProperty } from '$lib/util/tiled/types/objects/ObjectProperty';
import type { WorldPosition } from '$lib/util/tiled/types/WorldPosition';

export interface TiledObject {
    height: number;
    id: number;
    name: string;
    properties?: ObjectProperty[];
    text?: {
        color?: string;
        fontfamily?: string;
        italic?: boolean;
        pixelsize?: number;
        halign?: string;
        text: string;
        valign?: string;
        wrap?: boolean;
    };
    point?: boolean;
    polyline?: WorldPosition[];
    rotation: number;
    type: string;
    visible: boolean;
    width: number;
    x: number;
    y: number;
}
