<script lang="ts">
    import { Modal } from '@skeletonlabs/skeleton-svelte';
    import type { RunStats } from '$lib/game/features/powers/RunStats';
    import type { IgtGame } from '$lib/game/IgtGame';
    import { getContext } from 'svelte';
    import type { Power } from '$lib/game/features/powers/Power';
    import PowerIcon from '$lib/components/PowerIcon.svelte';
    import MonsterIcon from '$lib/components/MonsterIcon.svelte';
    import { fromArray } from '$lib/game/tools/random/Random';
    import UIcon from '$lib/components/UIcon.svelte';

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

    const getRandomDeath = () => {
        return fromArray([
            'You got swept up by a hurricane',
            'You got hit by a falling anvil',
            'You just sort of gave up',
            'You got struck by lightning',
            'Sssshh, you got hit by the silent killer',
        ]);
    };
</script>

<Modal
    bind:open={openState}
    triggerBase="hidden"
    contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm w-1/2"
    backdropClasses="backdrop-blur-sm"
>
    {#snippet content()}
        <header class="flex flex-row items-center justify-between">
            {#if stats.killer}
                <h3 class="h3">
                    #{game.features.character.runCount}. You were defeated
                    by {stats.killer?.monster.an ?? 'a'} {stats.killer?.monster.name ?? getRandomDeath()}
                </h3>
            {:else}
                <h2 class="h2">#{game.features.character.runCount}. {getRandomDeath()}</h2>
            {/if}
            {#if stats.killer}
                <MonsterIcon monster={stats.killer.monster}></MonsterIcon>
            {/if}
        </header>
        <article>
            <table class="table">
                <tbody>
                <tr>
                    <td>
                        <div class="flex flex-row items-center space-x-2">
                            <UIcon icon="swords" />
                            <span>Damage dealt</span>
                        </div>
                    </td>
                    <td>{stats.damageDealt.toFixed(0)}</td>
                </tr>
                <tr>
                    <td>
                        <div class="flex flex-row items-center space-x-2">
                            <UIcon icon="helmet" />
                            <span>Damage taken</span>
                        </div>
                    </td>
                    <td>{stats.damageTaken.toFixed(0)}</td>
                </tr>
                <tr>
                    <td>
                        <div class="flex flex-row items-center space-x-2">
                            <UIcon icon="skull" />
                            <span>Monsters defeated</span>
                        </div>
                    </td>
                    <td>{stats.monstersDefeated}</td>
                </tr>
                <tr>
                    <td>
                        <div class="flex flex-row items-center space-x-2">
                            <UIcon icon="marker" />
                            <span>Locations visited</span>
                        </div>
                    </td>
                    <td>{stats.locationsVisited.length}</td>
                </tr>
                </tbody>
            </table>

            <h2 class="h2">Powers Gained</h2>
            <div class="flex flex-row flex-wrap gap-2">
                {#each powersGained as power}
                    <PowerIcon {power} size="small" showLevel={false} />
                {/each}
            </div>
        </article>
        <footer class="flex justify-end gap-4">
            <button type="button" class="btn preset-filled" onclick={modalClose}>Next Run!</button>
        </footer>
    {/snippet}
</Modal>
