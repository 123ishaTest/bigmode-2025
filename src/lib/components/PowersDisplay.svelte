<script lang="ts">
    import { getContext } from 'svelte';
    import type { IgtGame } from '$lib/game/IgtGame';
    import PowerIcon from '$lib/components/PowerIcon.svelte';
    import type { Power } from '$lib/game/features/powers/Power';
    import { PowerType } from '$lib/game/features/powers/PowerType';
    import { transpose } from '$lib/util/format/Array';

    const game: IgtGame = getContext('game');
    let powers = $derived(game.features.powers);

    let powersTableData: (Power | undefined)[][] = $derived.by(() => {
        return transpose([
            powers.getPowers(PowerType.Attack),
            powers.getPowers(PowerType.Health),
            powers.getPowers(PowerType.Defense),
            powers.getPowers(PowerType.TravelSpeed),
        ]);
    });

    console.log(powersTableData);
</script>

<div class="border-2 border-primary-200 p-2">
    <div class="flex flex-row flex-wrap">
        <table>
            <thead>
                <tr>
                    <td class="text-center">Attack</td>
                    <td class="text-center">Health</td>
                    <td class="text-center">Defense</td>
                    <td class="text-center">Travel</td>
                </tr>
            </thead>
            <tbody>
                {#each powersTableData as row}
                    <tr>
                        {#each row as power}
                            {#if power == null}
                                <td></td>
                            {:else}
                                <td>
                                    <PowerIcon {power} />
                                </td>
                            {/if}
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
