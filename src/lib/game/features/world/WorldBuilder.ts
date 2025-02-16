import type { WorldPosition } from '$lib/util/tiled/types/WorldPosition';
import type { ObjectProperty } from '$lib/util/tiled/types/objects/ObjectProperty';
import type { Road } from '$lib/game/features/world/Road';
import type { ObjectGroup } from '$lib/util/tiled/types/layers/ObjectGroup';
import type { TiledLayer } from '$lib/util/tiled/types/layers/TiledLayer';
import type { TiledMap } from '$lib/util/tiled/types/TiledMap';
import type { WorldLocation } from '$lib/game/features/world/WorldLocation';
import type { RoadId } from '$lib/content/RoadId';
import { roadContent } from '$lib/content/RoadContent';
import type { RoadObstacle } from '$lib/game/features/world/RoadObstacle';

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

    getPropertyValue<T>(properties: ObjectProperty[] | undefined, targetName: string): T | null {
        if (properties == undefined) {
            return null;
        }
        const property = properties.find((property) => {
            return property.name === targetName;
        });
        return property?.value as T;
    }

    getMarkerAtPosition(position: WorldPosition) {
        const pathLayer = this.getLayer('Paths') as ObjectGroup;
        const points = pathLayer?.objects?.filter((object) => {
            return object.point;
        });
        return points?.find((p) => p.x === position.x && p.y === position.y);
    }

    parsePaths(): Road[] {
        const pathLayer = this.getLayer('Paths') as ObjectGroup;

        return pathLayer?.objects
            ?.filter((object) => {
                // Skip single points, we will parse them later.
                return object.polyline;
            })
            .map((object) => {
                const fromLocation = this.getMarkerAtPosition({
                    x: object.x + (object.polyline?.[0].x ?? 0),
                    y: object.y + (object.polyline?.[0].y ?? 0),
                });

                const from = this.getPropertyValue<string>(fromLocation?.properties, 'hrid') ?? 'unknown';
                const toLocation = this.getMarkerAtPosition({
                    x: object.x + (object.polyline?.[(object.polyline?.length ?? 1) - 1]?.x ?? 0),
                    y: object.y + (object.polyline?.[(object.polyline?.length ?? 1) - 1]?.y ?? 0),
                });

                const to = this.getPropertyValue<string>(toLocation?.properties, 'hrid') ?? 'unknown';

                const id = `${from}-${to}` as RoadId;
                // const baseDuration = this.getPropertyValue(properties, "baseDuration")

                const points =
                    object.polyline?.map((position) => {
                        return this.globalToTilePosition({
                            x: position.x + object.x,
                            y: position.y + object.y,
                        });
                    }) ?? [];
                // console.log(`{from: '${from}', to: '${to}', obstacles:[{monster: 'chicken', level: 1},{monster: 'chicken', level: 1},{monster: 'chicken', level: 1}]},`)

                const enemies = roadContent.find((r) => r.from === from && r.to === to)?.obstacles ?? [];

                const obstacles: RoadObstacle[] = enemies.map((e, index) => {
                    const percentage = enemies.length === 1 ? 0.5 : [0.25, 0.5, 0.75][index];
                    return {
                        distance: Math.ceil(percentage * points.length),
                        obstacle: e,
                    };
                });

                return {
                    id,
                    from,
                    to,
                    path: points,
                    duration: points.length,
                    obstacles,
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
                    id: this.getPropertyValue<string>(object.properties, 'hrid') ?? '/error/unknown',
                    position: this.globalToTilePosition({ x: object.x, y: object.y }),
                    name: this.getPropertyValue<string>(object.properties, 'name') ?? 'Name',
                };
            });
    }
}
