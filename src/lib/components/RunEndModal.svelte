<script lang="ts">
    import { Modal } from '@skeletonlabs/skeleton-svelte';
    import type { RunStats } from '$lib/game/features/powers/RunStats';
    import type { IgtGame } from '$lib/game/IgtGame';
    import { getContext } from 'svelte';
    import type { Power } from '$lib/game/features/powers/Power';

    let openState = $state(false);

    function modalClose() {
        openState = false;
    }

    const game: IgtGame = getContext('game');

    let stats: RunStats = $state({} as RunStats);
    let powersGained: Power[] = $state([]);

    game.features.powers.onPowersGained.subscribe((runStats, powers) => {
        openState = true;
        stats = runStats;
        powersGained = powers;
    });
</script>

<Modal
    bind:open={openState}
    triggerBase="hidden"
    contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm"
    backdropClasses="backdrop-blur-sm"
>
    {#snippet content()}
        <header class="flex justify-between">
            <h2 class="h2">Run Completed</h2>
        </header>
        <article>
            <p class="opacity-60">Congratulations on your run. Here are your stats</p>
            <span>{JSON.stringify(stats, null, 2)}</span>

            <div class="flex flex-col space-y-2">
                <p class="opacity-60">Congratulations on your run. Here are your stats</p>
                {#each powersGained as power}
                    <span>You power {power.name} is now level {game.features.powers.getPowerLevel(power.id)}</span>
                {/each}
            </div>
        </article>
        <footer class="flex justify-end gap-4">
            <button type="button" class="btn preset-filled" onclick={modalClose}>Next Run!</button>
        </footer>
    {/snippet}
</Modal>
