<script lang="ts">
    import { IgtGame } from '$lib/game/IgtGame';
    import { getContext } from 'svelte';
    import type { TravelAction } from '$lib/game/features/character/Character.svelte';

    const game: IgtGame = getContext('game');
    let getRoadDescription = (action: TravelAction) => {
        const road = game.features.world.getRoad(action.roadId);
        const fromName = game.features.world.getLocation(road.from).name;
        const toName = game.features.world.getLocation(road.to).name;
        return `${action.reverse ? toName : fromName} -> ${action.reverse ? fromName : toName}`;
    };
</script>

<div class="flex w-64 flex-col border-2 border-b-0 border-primary-200 p-2">
    {#each game.features.character.actionQueue as action}
        <p class="text-sm">{getRoadDescription(action)}</p>
    {/each}
</div>
