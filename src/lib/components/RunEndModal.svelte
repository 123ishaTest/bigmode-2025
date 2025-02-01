<script lang="ts">
    import { Modal } from '@skeletonlabs/skeleton-svelte';
    import type { RunStats } from '$lib/game/features/powers/RunStats';
    import type { IgtGame } from '$lib/game/IgtGame';
    import { getContext } from 'svelte';
    import type { Power } from '$lib/game/features/powers/Power';
    import { toCapitalizedWords } from '$lib/util/format/String';
    import PowerIcon from '$lib/components/PowerIcon.svelte';
    import MonsterIcon from '$lib/components/MonsterIcon.svelte';

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
        <header class="flex flex-row items-center justify-between">
            <h2 class="h2">You died to a {stats.killer.monster.name}</h2>
            <MonsterIcon monster={stats.killer.monster}></MonsterIcon>
        </header>
        <article>
            <h2 class="h2">Summary</h2>
            <table class="table">
                <tbody>
                    <tr>
                        <td>Damage dealt</td>
                        <td>{stats.damageDealt.toFixed(0)}</td>
                    </tr>
                    <tr>
                        <td>Damage taken</td>
                        <td>{stats.damageTaken.toFixed(0)}</td>
                    </tr>
                    <tr>
                        <td>Monsters defeated</td>
                        <td>{stats.monstersDefeated}</td>
                    </tr>
                    <tr>
                        <td>Locations visited</td>
                        <td>{stats.locationsVisited}</td>
                    </tr>
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
