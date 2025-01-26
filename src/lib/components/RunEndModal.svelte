<script lang="ts">
    import { Modal } from '@skeletonlabs/skeleton-svelte';
    import type { RunStats } from '$lib/game/features/powers/RunStats';
    import type { IgtGame } from '$lib/game/IgtGame';
    import { getContext } from 'svelte';
    import type { Power } from '$lib/game/features/powers/Power';
    import { toCapitalizedWords } from '$lib/util/format/String';
    import PowerIcon from '$lib/components/PowerIcon.svelte';

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
    contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm w-1/2"
    backdropClasses="backdrop-blur-sm"
>
    {#snippet content()}
        <header class="flex justify-between">
            <h2 class="h2">You died.</h2>
        </header>
        <article>
            <h2 class="h2">Summary</h2>
            <table class="table">
                <tbody>
                    {#each Object.entries(stats) as stat}
                        <tr>
                            <td>{toCapitalizedWords(stat[0])}</td>
                            <td>{stat[1]}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>

            <h2 class="h2">Powers Gained</h2>
            <table class="table">
                <tbody>
                    {#each powersGained as power}
                        <tr>
                            <td><PowerIcon {power} size="small" showLevel={false} /></td>
                            <td>{power.name}</td>
                            <td>Lvl. {game.features.powers.getPowerLevel(power.id)}</td>
                            <td>{game.features.powers.getPowerMultiplier(power.id).toFixed(2)}x</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </article>
        <footer class="flex justify-end gap-4">
            <button type="button" class="btn preset-filled" onclick={modalClose}>Next Run!</button>
        </footer>
    {/snippet}
</Modal>
