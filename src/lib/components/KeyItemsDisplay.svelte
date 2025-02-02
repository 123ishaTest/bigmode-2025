<script lang="ts">
    import { getContext, onMount } from 'svelte';
    import type { IgtGame } from '$lib/game/IgtGame';
    import KeyItem from '$lib/components/KeyItem.svelte';

    const game: IgtGame = getContext('game');
    let keyItems = $derived(game.features.keyItems);

    import { type ToastContext } from '@skeletonlabs/skeleton-svelte';

    export const toast: ToastContext = getContext('toast');

    onMount(() => {
        keyItems.onKeyItemGain.subscribe((item) => {
            toast.create({
                title: `${item.name} unlocked!`,
                description: `${item.description}`,
                type: 'success',
            });
        });
    });
</script>

<div class="flex flex-row flex-wrap justify-center gap-2">
    {#each keyItems.keyItems as keyItem}
        <KeyItem {keyItem} />
    {/each}
</div>
