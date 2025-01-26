<script lang="ts">
    import { getContext } from 'svelte';
    import type { IgtGame } from '$lib/game/IgtGame';

    const game: IgtGame = getContext('game');
    let powers = $derived(game.features.powers);
</script>

<div class="h-64 border-2 border-primary-200 p-2">
    <div class="flex flex-row space-x-4">
        {#each powers.powers as power}
            <div class="flex flex-col">
                <div class="h-12 w-12 bg-primary-500">IMG</div>
                <p>{power.name} ({powers.getPowerLevel(power.id)}x)</p>
            </div>
        {/each}
    </div>
</div>
