<script lang="ts">
    import { getContext } from 'svelte';
    import type { IgtGame } from '$lib/game/IgtGame';
    import KeyItem from '$lib/components/KeyItem.svelte';

    const game: IgtGame = getContext('game');
    let keyItems = $derived(game.features.keyItems);
</script>

<div class="flex flex-row flex-wrap justify-center gap-2">
    {#each keyItems.keyItems as keyItem}
        <KeyItem {keyItem} />
    {/each}
</div>
