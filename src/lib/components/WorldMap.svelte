<script lang="ts">
    import worldMap from '$lib/worldmap/maps/tutorial/tutorial.json';

    import { getContext, onMount } from 'svelte';

    import { TiledWrapperSvelte } from '$lib/util/tiled/TiledWrapper.svelte';
    import Panzoom from '@panzoom/panzoom';
    import type { IgtGame } from '$lib/game/IgtGame';
    import type { TiledObject } from '$lib/util/tiled/types/objects/TiledObject';
    import type { WorldLocationId } from '$lib/content/WorldLocationId';
    import ActionQueueDisplay from '$lib/components/ActionQueueDisplay.svelte';
    import RoadProgressDisplay from '$lib/components/RoadProgressDisplay.svelte';
    import type { WorldPosition } from '$lib/util/tiled/types/WorldPosition';

    let game: IgtGame = getContext('game');

    let worldCanvas: HTMLCanvasElement;
    let playerCanvas: HTMLCanvasElement;

    let travel = (target: WorldLocationId) => {
        game.features.world.moveToLocation(target);
    };

    let currentLocation = $derived(game.features.world.getCurrentLocation());

    let tiledWrapper: TiledWrapperSvelte = $state(
        new TiledWrapperSvelte(
            worldMap,
            () => {
                tiledWrapper.render();
                tiledWrapper.renderPlayer(currentLocation.position.x, currentLocation.position.y);
            },
            (clickBox: TiledObject) => {
                let locationId = clickBox.properties?.find((p) => p.name === 'hrid')?.value;
                if (!locationId) {
                    console.error('Unknown clickbox', clickBox);
                }
                travel(locationId);
            },
        ),
    );

    let showPointer = $derived(tiledWrapper.isHoveringOverClickBox);

    const panZoomOptions = {
        disableZoom: false,
        minScale: 0.8,
        maxScale: 5,
        contain: 'outside',
        canvas: true,
    };
    onMount(() => {
        tiledWrapper.bindCanvii(worldCanvas, playerCanvas);

        const worldPanZoom = Panzoom(tiledWrapper.canvas, panZoomOptions);
        const playerPanZoom = Panzoom(tiledWrapper.playerCanvas, panZoomOptions);

        tiledWrapper.canvas?.parentElement?.addEventListener('wheel', worldPanZoom.zoomWithWheel);
        tiledWrapper.canvas?.parentElement?.addEventListener('wheel', () => {
            tiledWrapper.currentScale = worldPanZoom.getScale();
        });
        tiledWrapper.playerCanvas?.parentElement?.addEventListener('wheel', playerPanZoom.zoomWithWheel);

        tiledWrapper.currentScale = worldPanZoom.getScale();
    });

    const activeRoads = $derived.by(() => {
        return game.features.character.actionQueue.map((a) => {
            let road = game.features.world.getRoad(a.roadId);
            return road.path.map((p) => {
                return {
                    x: (road.position.x + p.x) / 16,
                    y: (road.position.y + p.y) / 16,
                };
            });
        });
    });

    const worldMapPosition: WorldPosition = $derived.by(() => {
        const action = game.features.character.getCurrentRoadAction();

        if (!action) {
            return { x: currentLocation.position.x, y: currentLocation.position.y };
        }
        const road = game.features.world.getRoad(action.roadId);
        let percentage = game.features.character.roadProgress / road.duration;
        if (action.reverse) {
            percentage = 1 - percentage;
        }
        const index = Math.floor(percentage * road.path.length);
        const node = road.path[index];
        return {
            x: (road.position.x + node.x) / 16,
            y: (road.position.y + node.y) / 16,
        };
    });

    $effect(() => {
        tiledWrapper.renderPlayer(worldMapPosition.x, worldMapPosition.y, activeRoads);
    });
</script>

<div class="flex min-h-[calc(100vh-96px)] flex-col">
    <div class="flex h-full flex-row">
        <span class="absolute z-30 w-24 border-l-2 border-t-2 border-primary-200 bg-primary-800 p-2 text-center"
            >{currentLocation.name}</span
        >

        <div class="relative w-full border-l-2 border-t-2 border-primary-200">
            <canvas
                bind:this={worldCanvas}
                class="pixelated absolute z-10 {showPointer ? 'cursor-pointer' : 'cursor-default'}"
            ></canvas>
            <canvas
                bind:this={playerCanvas}
                class="pixelated absolute z-20 {showPointer ? 'cursor-pointer' : 'cursor-default'}"
            ></canvas>
        </div>

        <ActionQueueDisplay />
    </div>

    <div class="relative flex h-64 w-full flex-row items-center justify-between border-2 border-primary-200 p-2">
        {#if game.features.character.actionQueue.length > 0}
            <RoadProgressDisplay />
        {:else}
            <span>Idling...</span>
        {/if}
    </div>
</div>

<style>
    .pixelated {
        image-rendering: -moz-crisp-edges;
        image-rendering: pixelated;
        -ms-interpolation-mode: nearest-neighbor;
    }
</style>
