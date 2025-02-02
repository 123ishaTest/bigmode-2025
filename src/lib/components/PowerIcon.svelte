<script lang="ts">
    import { base } from '$app/paths';
    import type { Power } from '$lib/game/features/powers/Power';
    import type { IgtGame } from '$lib/game/IgtGame';
    import { getContext } from 'svelte';
    import type { Powers } from '$lib/game/features/powers/Powers.svelte';

    interface Props {
        power: Power;
        size?: 'small' | 'medium' | 'large';
        showLevel?: boolean;
    }

    let { power, size = 'medium', showLevel = true }: Props = $props();
    let path = $derived(power.icon);

    let game: IgtGame = getContext('game');
    let powers: Powers = $derived(game.features.powers);
    let level: number = $derived(powers.getPowerLevel(power.id));
    let isGranted: boolean = $derived(level > 0);
    let multiplier: number = $derived(powers.getPowerMultiplier(power.id));
    let sizeClass = $derived.by(() => {
        switch (size) {
            case 'small':
                return 'w-12 h-12';
            case 'medium':
                return 'w-16 h-16';
            case 'large':
                return 'w-24 h-24';
        }
    });
    import { Tooltip } from '@skeletonlabs/skeleton-svelte';
    import UIcon from '$lib/components/UIcon.svelte';

    let openState = $state(false);
</script>

<Tooltip
    bind:open={openState}
    positioning={{ placement: 'top' }}
    triggerBase="underline"
    contentBase="card preset-filled p-4"
    openDelay={200}
>
    {#snippet trigger()}
        <div class="relative flex flex-col border-2" title={power.name}>
            <img class="pixelated {sizeClass} {level === 0 ? 'grayscale' : ''}" src="{base}/images/{path}" alt={path} />
            {#if isGranted && showLevel}
                <span class="absolute bottom-0 right-0.5 p-0.5">{level}</span>
            {/if}
        </div>
    {/snippet}
    {#snippet content()}
        <div class="flex flex-col space-y-2">
            <span>{power.name}</span>
            {#if isGranted}
                <div class="flex flex-row items-center space-x-1">
                    <span>Lvl. {level} -> {multiplier.toFixed(2)}x</span>
                    <UIcon icon={power.type} />
                </div>
            {:else}
                <p>You have not been granted this power.</p>
            {/if}
        </div>
    {/snippet}
</Tooltip>
