import type { TiledMap } from '$lib/util/tiled/types/TiledMap';
import type { TileSet } from '$lib/util/tiled/types/TileSet';
import type { WorldPosition } from '$lib/util/tiled/types/WorldPosition';
import type { ObjectGroup } from '$lib/util/tiled/types/layers/ObjectGroup';
import type { TileLayer } from '$lib/util/tiled/types/layers/TileLayer';
import type { TiledLayer } from '$lib/util/tiled/types/layers/TiledLayer';
import { Images, MonsterImages, TileSets } from '$lib/worldmap/tilesets';
import type { TiledObject } from '$lib/util/tiled/types/objects/TiledObject';
import type { Road } from '$lib/game/features/world/Road';
import type { MonsterId } from '$lib/game/features/bestiary/MonsterId';
import { monsters } from '$lib/content/MonsterContent';
import type { TravelAction } from '$lib/game/features/character/Character.svelte';
import type { IgtGame } from '$lib/game/IgtGame';

/**
 * Wrapper to work with Tiled maps.
 * Support is very limited at the moment. It can render tiles and areas as clickboxes.
 * Text is also shown, but not all properties are supported.
 */
export class TiledWrapperSvelte {
    game: IgtGame;
    worldMap: TiledMap;
    clickBoxes: TiledObject[] = [];

    canvas!: HTMLCanvasElement;
    playerCanvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D;

    tileHeight: number;
    tileWidth: number;

    tileSets: TileSet[] = [];

    isHoveringOverClickBox: boolean = $state(false);

    tileSetsLoaded = 0;
    monstersLoaded = 0;
    monstersNeeded = monsters.length;
    /**
     * Called when all images are loaded. Don't render before this
     */
    onInitialized: () => void;
    /**
     * Called when a ClickBox is clicked
     */
    onClickBoxClicked: (box: TiledObject) => void;

    playerImage: HTMLImageElement;
    monsterImages!: Record<MonsterId, HTMLImageElement>;
    playerImagedLoaded = false;

    currentScale: number = 1;

    constructor(
        game: IgtGame,
        worldMap: TiledMap,
        onInitialized: () => void,
        onClickBoxClicked: (box: TiledObject) => void,
    ) {
        this.game = game;
        this.worldMap = worldMap;

        this.onInitialized = onInitialized;
        this.onClickBoxClicked = onClickBoxClicked;

        this.playerImage = new Image();
        this.playerImage.onload = () => {
            this.playerImagedLoaded = true;
            this.checkIfReady();
        };

        this.playerImage.src = Images.character;

        this.monsterImages = {} as Record<MonsterId, HTMLImageElement>;
        monsters.forEach((m) => {
            const image = new Image();
            image.onload = () => {
                this.monstersLoaded++;
                this.checkIfReady();
            };
            image.src = MonsterImages[m.id];
            this.monsterImages[m.id] = image;
        });

        this.tileHeight = this.worldMap.tileheight;
        this.tileWidth = this.worldMap.tilewidth;

        this.tileSets = worldMap.tilesets.map((tileSet) => {
            const jsonId: string = this.getJsonId(tileSet.source);

            const imageCache = new Image();

            imageCache.src = Images[jsonId];

            imageCache.onload = () => {
                this.tileSetsLoaded++;
                this.checkIfReady();
            };

            return {
                imageCache: imageCache,
                firstgid: tileSet.firstgid,

                ...TileSets[jsonId],
            };
        });
    }

    public bindCanvii(world: HTMLCanvasElement, player: HTMLCanvasElement) {
        this.canvas = world;
        this.playerCanvas = player;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.canvas.width = this.worldMap.width * this.tileWidth;
        this.canvas.height = this.worldMap.height * this.tileHeight;

        this.playerCanvas.width = this.worldMap.width * this.tileWidth;
        this.playerCanvas.height = this.worldMap.height * this.tileHeight;
    }

    globalToTilePosition(global: WorldPosition): WorldPosition {
        return {
            x: Math.floor(global.x / this.tileWidth),
            y: Math.floor(global.y / this.tileHeight),
        };
    }

    checkIfReady() {
        if (this.tileSetsLoaded !== this.tileSets.length) {
            return false;
        }
        if (!this.playerImagedLoaded) {
            return false;
        }

        this.onInitialized();
    }

    renderMonsters(roads: Road[]): void {
        const ctx = this.playerCanvas.getContext('2d') as CanvasRenderingContext2D;
        roads.forEach((road) => {
            road.obstacles.forEach((obstacle) => {
                const x = road.path[obstacle.distance].x * this.tileWidth;
                const y = road.path[obstacle.distance].y * this.tileHeight;

                ctx.drawImage(this.monsterImages[obstacle.obstacle.monster], x, y, this.tileWidth, this.tileHeight);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = 'red';
                ctx.font = '12px pixel';
                ctx.textRendering = 'geometricPrecision';
                ctx.fillText(obstacle.obstacle.level.toString(), x + 16, y + 12);
            });
        });
    }

    renderPlayer(x: number, y: number, allRoads: Road[], actions: TravelAction[] = []) {
        const ctx = this.playerCanvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, this.playerCanvas.width, this.playerCanvas.height);

        // Paths
        ctx.lineWidth = 2;
        // Only start drawing from the player
        let foundPlayer = false;
        actions.forEach((action) => {
            ctx.strokeStyle = 'blue';

            ctx.beginPath();

            const road = this.game.features.world.getRoad(action.roadId);

            const worldPositions = action.reverse ? road.path.toReversed() : road.path;

            worldPositions.forEach((position) => {
                if (position.x === x && position.y === y) {
                    foundPlayer = true;
                }
                const drawX = (position.x + 0.5) * this.tileWidth;
                const drawY = (position.y + 0.5) * this.tileHeight;

                if (foundPlayer) {
                    ctx.lineTo(drawX, drawY);
                }
            });
            ctx.stroke();
        });

        this.renderMonsters(allRoads);

        ctx.drawImage(this.playerImage, x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
    }

    getJsonId(source: string): string {
        const ending = source.split('/');
        const fileName = ending[ending.length - 1];
        return fileName.split('.json')[0];
    }

    indexToXY(index: number, width: number) {
        const x = index % width;
        const y = Math.floor(index / width);
        return [x, y];
    }

    isPointInRectangle(px: number, py: number, rx: number, ry: number, rw: number, rh: number): boolean {
        if (px < rx || px > rx + rw) {
            return false;
        }
        if (py < ry || py > ry + rh) {
            return false;
        }
        return true;
    }

    getCursorPosition(event: MouseEvent) {
        const rect = this.playerCanvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) / this.currentScale;
        const y = (event.clientY - rect.top) / this.currentScale;
        return [x, y];
    }

    private renderObjectGroup(layer: ObjectGroup) {
        for (let i = 0; i < layer.objects.length; i++) {
            const object = layer.objects[i];

            if (object.text) {
                this.ctx.font = `${object.text.pixelsize}px ${object.text.fontfamily}`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillStyle = object.text.color ?? 'black';
                this.ctx.fillText(object.text.text, object.x + object.width / 2, object.y + object.height / 2);
            }
            if (object.properties) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = 'black';
                this.ctx.rect(object.x, object.y, object.width, object.height);
                // this.ctx.stroke();
                this.clickBoxes.push(object);
            }
        }
    }

    private getTileSetFromGid(id: number) {
        let highestFound = -1;
        let highestIndex = -1;
        for (let i = 0; i < this.tileSets.length; i++) {
            if (id >= this.tileSets[i].firstgid) {
                if (this.tileSets[i].firstgid >= highestFound) {
                    highestFound = this.tileSets[i].firstgid;
                    highestIndex = i;
                }
            }
        }
        return this.tileSets[highestIndex];
    }

    private renderTileLayer(layer: TileLayer) {
        const data = layer.data;
        const width = layer.width;
        for (let i = 0; i < data.length; i++) {
            if (data[i] === 0) {
                continue;
            }
            const [destinationX, destinationY] = this.indexToXY(i, width);

            const tileSet = this.getTileSetFromGid(data[i]);

            const [sourceX, sourceY] = this.indexToXY(data[i] - tileSet.firstgid, tileSet.columns);
            const spacing = tileSet.spacing;
            const sx = sourceX * (this.tileWidth + spacing);
            const sy = sourceY * (this.tileHeight + spacing);
            const dx = destinationX * this.tileWidth;
            const dy = destinationY * this.tileHeight;

            const img = tileSet.imageCache;
            this.ctx.drawImage(img, sx, sy, this.tileWidth, this.tileHeight, dx, dy, this.tileWidth, this.tileHeight);
        }
    }

    renderLayer(layer: TiledLayer) {
        switch (layer.type) {
            case 'tilelayer':
                this.renderTileLayer(layer as TileLayer);
                break;
            case 'objectgroup':
                this.renderObjectGroup(layer as ObjectGroup);
                break;
            default:
                throw new Error(`Unsupported type ${layer.type}`);
        }
    }

    render() {
        const layerCount = this.worldMap.layers.length;
        for (let i = 0; i < layerCount; i++) {
            this.renderLayer(this.worldMap.layers[i]);
        }

        this.playerCanvas.onmousemove = (event: MouseEvent) => {
            const [mouseX, mouseY] = this.getCursorPosition(event);
            for (const clickBox of this.clickBoxes) {
                if (this.isPointInRectangle(mouseX, mouseY, clickBox.x, clickBox.y, clickBox.width, clickBox.height)) {
                    this.isHoveringOverClickBox = true;
                    return;
                }
            }
            this.isHoveringOverClickBox = false;
        };

        this.playerCanvas.onclick = (event: MouseEvent) => {
            // get the mouse position
            const [mouseX, mouseY] = this.getCursorPosition(event);
            // iterate each shape in the shapes array
            for (let i = 0; i < this.clickBoxes.length; i++) {
                const clickBox = this.clickBoxes[i];
                if (this.isPointInRectangle(mouseX, mouseY, clickBox.x, clickBox.y, clickBox.width, clickBox.height)) {
                    this.onClickBoxClicked(clickBox);
                }
            }
        };
    }
}
