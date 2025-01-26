import type { WorldPosition } from '$lib/util/tiled/types/WorldPosition';
import type { ObjectProperty } from '$lib/util/tiled/types/objects/ObjectProperty';
import type { Road } from '$lib/game/features/world/Road';
import type { ObjectGroup } from '$lib/util/tiled/types/layers/ObjectGroup';
import type { WorldLocationId } from '$lib/content/WorldLocationId';
import type { TiledLayer } from '$lib/util/tiled/types/layers/TiledLayer';
import type { TiledMap } from '$lib/util/tiled/types/TiledMap';
import { MonsterId } from '$lib/game/features/bestiary/MonsterId';
import type { WorldLocation } from '$lib/game/features/world/WorldLocation';

export class WorldBuilder {
    worldMap: TiledMap;

    constructor(worldMap: TiledMap) {
        this.worldMap = worldMap;
    }

    globalToTilePosition(global: WorldPosition): WorldPosition {
        const tileHeight = this.worldMap.tileheight;
        const tileWidth = this.worldMap.tilewidth;
        return {
            x: Math.floor(global.x / tileWidth),
            y: Math.floor(global.y / tileHeight),
        };
    }

    getPropertyValue(properties: ObjectProperty[] | undefined, targetName: string) {
        if (properties == undefined) {
            return null;
        }
        const property = properties.find((property) => {
            return property.name === targetName;
        });
        return property?.value;
    }

    parsePaths(): Road[] {
        const pathLayer = this.getLayer('Paths') as ObjectGroup;

        return pathLayer?.objects
            ?.filter((object) => {
                // Skip single points, we will parse them later.
                return object.polyline;
            })
            .map((object) => {
                const properties = object.properties as ObjectProperty[];
                const from = this.getPropertyValue(properties, 'from');
                const to = this.getPropertyValue(properties, 'to');
                const id = `${from}-${to}` as WorldLocationId;
                // const baseDuration = this.getPropertyValue(properties, "baseDuration")

                const points =
                    object.polyline?.map((position) => {
                        return this.globalToTilePosition({
                            x: position.x + object.x,
                            y: position.y + object.y,
                        });
                    }) ?? [];
                return {
                    id,
                    from,
                    to,
                    path: points,
                    duration: points.length,
                    obstacles: [
                        { distance: 5, obstacle: { monster: MonsterId.Chicken, level: 1 } },
                        { distance: 10, obstacle: { monster: MonsterId.Chicken, level: 1 } },
                        { distance: 15, obstacle: { monster: MonsterId.Chicken, level: 2 } },
                    ],
                };
            });
    }

    getLayer(name: string): TiledLayer {
        const world = this.worldMap;
        return world.layers.find((layer) => {
            return layer.name === name;
        }) as TiledLayer;
    }

    parseWorldLocations(): WorldLocation[] {
        const hitBoxLayer = this.getLayer('Paths') as ObjectGroup;

        return hitBoxLayer?.objects
            ?.filter((object) => {
                // Only parse points.
                return object.point;
            })
            .map((object) => {
                return {
                    id: this.getPropertyValue(object.properties, 'hrid'),
                    position: this.globalToTilePosition({ x: object.x, y: object.y }),
                    name: this.getPropertyValue(object.properties, 'name') ?? 'Name',
                };
            });
    }
}
