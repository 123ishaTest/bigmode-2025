<script lang="ts">
    import { getContext } from 'svelte';
    import type { IgtGame } from '$lib/game/IgtGame';
    import SidePanel from '$lib/components/SidePanel.svelte';
    import KeyItem from '$lib/components/KeyItem.svelte';

    const game: IgtGame = getContext('game');
    let keyItems = $derived(game.features.keyItems);
</script>

<SidePanel>
    {#snippet title()}
        <h3 class="h3">Items</h3>
    {/snippet}
    {#snippet body()}
        <div class="flex flex-row flex-wrap">
            {#each keyItems.keyItems as keyItem}
                <KeyItem {keyItem} />
            {/each}
        </div>
    {/snippet}
</SidePanel>
