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
</script>

<!-- Svelte Compiler too stupid to use character.isAtObstacle :( -->
{#if character.currentObstacle != null}
    <CombatDisplay combat={character.currentObstacle} />
{:else}
    <Progress value={character.roadProgress} max={road.duration} meterBg="bg-orange-800">
        <h4 class="h4">Traveling...</h4>
    </Progress>
{/if}
