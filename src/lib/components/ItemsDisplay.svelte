<script lang="ts">
    // import { getContext } from 'svelte';
    // import type { IgtGame } from '$lib/game/IgtGame';
    import SidePanel from '$lib/components/SidePanel.svelte';

    // const game: IgtGame = getContext('game');
</script>

<SidePanel>
    {#snippet title()}
        <h3 class="h3">Items</h3>
    {/snippet}
    {#snippet body()}
        <span>Items go here</span>
    {/snippet}
</SidePanel>
