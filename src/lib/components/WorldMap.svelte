<script lang="ts">
    import { getContext, onMount } from 'svelte';

    import { TiledWrapperSvelte } from '$lib/util/tiled/TiledWrapper.svelte';
    import Panzoom from '@panzoom/panzoom';
    import type { IgtGame } from '$lib/game/IgtGame';
    import type { TiledObject } from '$lib/util/tiled/types/objects/TiledObject';
    import type { WorldLocationId } from '$lib/content/WorldLocationId';
    import type { WorldPosition } from '$lib/util/tiled/types/WorldPosition';
    import { map } from '$lib/game.svelte';
    import SidePanel from '$lib/components/SidePanel.svelte';
    import { toCapitalizedWords } from '$lib/util/format/String';
    import UIcon from '$lib/components/UIcon.svelte';

    let game: IgtGame = getContext('game');

    let worldCanvas: HTMLCanvasElement;
    let playerCanvas: HTMLCanvasElement;

    let travel = (target: WorldLocationId) => {
        if (isPanning) {
            return;
        }
        game.features.world.moveToLocation(target);
    };

    let currentLocation = $derived(game.features.world.getCurrentLocation());

    let tiledWrapper: TiledWrapperSvelte = $state(
        new TiledWrapperSvelte(
            game,
            map,
            () => {
                tiledWrapper.render();
                tiledWrapper.renderPlayer(
                    currentLocation.position.x,
                    currentLocation.position.y,
                    game.features.world.roads,
                );
            },
            (clickBox: TiledObject) => {
                let locationId = clickBox.properties?.find((p) => p.name === 'hrid')?.value;
                console.log('clickBox', clickBox, locationId);

                if (!locationId) {
                    console.error('Unknown clickbox', clickBox);
                }
                travel(locationId as string);
            },
        ),
    );

    let showPointer = $derived(tiledWrapper.isHoveringOverClickBox);

    const panZoomOptions = {
        disableZoom: false,
        minScale: 0.6,
        maxScale: 5,
        contain: 'outside',
        canvas: true,
    };

    let isPanning = $state(false);

    onMount(() => {
        tiledWrapper.bindCanvii(worldCanvas, playerCanvas);

        const worldPanZoom = Panzoom(tiledWrapper.canvas, panZoomOptions);
        const playerPanZoom = Panzoom(tiledWrapper.playerCanvas, panZoomOptions);

        tiledWrapper.canvas?.parentElement?.addEventListener('wheel', worldPanZoom.zoomWithWheel);
        tiledWrapper.canvas?.parentElement?.addEventListener('wheel', () => {
            tiledWrapper.currentScale = worldPanZoom.getScale();
        });
        tiledWrapper.canvas?.addEventListener('panzoompan', () => {
            isPanning = true;
        });
        tiledWrapper.canvas?.addEventListener('panzoomend', () => {
            // Very ugly hack
            setTimeout(() => {
                isPanning = false;
            }, 5);
        });
        tiledWrapper.playerCanvas?.parentElement?.addEventListener('wheel', playerPanZoom.zoomWithWheel);

        tiledWrapper.currentScale = worldPanZoom.getScale();
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
        const index = Math.min(Math.floor(percentage * road.path.length), road.path.length - 1);
        return road.path[index];
    });

    $effect(() => {
        tiledWrapper.renderPlayer(
            worldMapPosition.x,
            worldMapPosition.y,
            game.features.world.roads,
            game.features.character.actionQueue,
        );
    });

    const endRun = () => {
        game.features.character.die();
    };

    let locationName = $derived.by(() => {
        let split = currentLocation.id.split('/');
        return toCapitalizedWords(split[split.length - 1]);
    });
</script>

<div class="flex min-h-[calc(100vh-96px)] flex-col space-y-4">
    <SidePanel>
        {#snippet body()}
            <div class="relative flex h-full flex-row">
                <div class="relative w-full">
                    <canvas
                        bind:this={worldCanvas}
                        class="pixelated absolute {showPointer ? 'cursor-pointer' : 'cursor-default'}"
                    ></canvas>
                    <canvas
                        bind:this={playerCanvas}
                        class="pixelated absolute {showPointer ? 'cursor-pointer' : 'cursor-default'}"
                    ></canvas>
                </div>
                <span class="absolute w-24 bg-primary-800 p-2 text-center">{locationName}</span>
                <button
                    onclick={endRun}
                    class="absolute right-0 flex flex-row items-center space-x-1 bg-red-500 px-2 py-1 text-center"
                >
                    <UIcon icon="skull" />
                    <span>End run</span>
                </button>
            </div>
        {/snippet}
    </SidePanel>
</div>
