<script lang="ts">
    import { IgtGame } from '$lib/game/IgtGame';
    import { getContext } from 'svelte';
    import CombatDisplay from '$lib/components/CombatDisplay.svelte';
    import { Progress } from '@skeletonlabs/skeleton-svelte';

    const game: IgtGame = getContext('game');

    let character = $derived(game.features.character);
    let world = $derived(game.features.world);

    let action = $derived(character.actionQueue[0]);
    let road = $derived(world.getRoad(action.roadId));

    let itinerary = $derived.by(() => {
        const destinations = character.actionQueue.map((action) => {
            const road = game.features.world.getRoad(action.roadId);
            const fromName = game.features.world.getLocation(road.from).name;
            const toName = game.features.world.getLocation(road.to).name;
            return action.reverse ? fromName : toName;
        });

        return world.getCurrentLocation().name + ', ' + destinations.join(', ');
    });
</script>

<!-- Svelte Compiler too stupid to use character.isAtObstacle :( -->
{#if character.currentObstacle != null}
    <CombatDisplay combat={character.currentObstacle} />
{:else}
    <div class="flex w-full flex-col space-y-4">
        <Progress value={character.roadProgress} max={road.duration} meterBg="bg-orange-800" />
        <h4 class="h4">{itinerary}</h4>
    </div>
{/if}
