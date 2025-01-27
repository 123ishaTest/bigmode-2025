<script lang="ts">
    import { base } from '$app/paths';
    import type { IgtGame } from '$lib/game/IgtGame';
    import { getContext, onMount } from 'svelte';

    interface Props {
        keyItem: KeyItem;
        size?: 'small' | 'medium' | 'large';
        showLevel?: boolean;
    }

    let { keyItem, size = 'medium' }: Props = $props();
    let path = $derived(keyItem.icon);

    let game: IgtGame = getContext('game');
    let keyItems: KeyItems = $derived(game.features.keyItems);
    let hasKeyItem: boolean = $derived(keyItems.hasKeyItem(keyItem.id));

    let sizeClass = $derived.by(() => {
        switch (size) {
            case 'small':
                return 'w-8 h-8';
            case 'medium':
                return 'w-16 h-16';
            case 'large':
                return 'w-24 h-24';
        }
    });
    import { Tooltip } from '@skeletonlabs/skeleton-svelte';
    import type { KeyItem } from '$lib/game/features/keyitems/KeyItem';
    import type { KeyItems } from '$lib/game/features/keyitems/KeyItems.svelte.js';

    let openState = $state(false);

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

<Tooltip
    bind:open={openState}
    positioning={{ placement: 'top' }}
    triggerBase="underline"
    contentBase="card preset-filled p-4"
    openDelay={200}
>
    {#snippet trigger()}
        <div class="relative flex flex-col border-2" title={keyItem.name}>
            <img class="pixelated {sizeClass} {!hasKeyItem ? 'grayscale' : ''}" src="{base}/images/{path}" alt={path} />
        </div>
    {/snippet}
    {#snippet content()}
        <div class="flex flex-col space-y-2">
            <span>{keyItem.name}</span>
            {#if hasKeyItem}
                <span>{keyItem.description}</span>
            {:else}
                <p>{keyItem.unlockHint}</p>
            {/if}
        </div>
    {/snippet}
</Tooltip>
