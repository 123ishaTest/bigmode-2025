<script lang="ts">
    import { getContext } from 'svelte';
    import type { IgtGame } from '$lib/game/IgtGame';
    import PowerIcon from '$lib/components/PowerIcon.svelte';
    import type { Power } from '$lib/game/features/powers/Power';
    import { PowerType } from '$lib/game/features/powers/PowerType';
    import { transpose } from '$lib/util/format/Array';
    import SidePanel from '$lib/components/SidePanel.svelte';
    import UIcon from '$lib/components/UIcon.svelte';

    const game: IgtGame = getContext('game');
    let powers = $derived(game.features.powers);

    let powersTableData: (Power | undefined)[][] = $derived.by(() => {
        return transpose([
            powers.getPowers(PowerType.Health),
            powers.getPowers(PowerType.Attack),
            powers.getPowers(PowerType.Defense),
            powers.getPowers(PowerType.TravelSpeed),
        ]);
    });
</script>

<SidePanel>
    {#snippet title()}
        <h3 class="h3">Powers</h3>
    {/snippet}
    {#snippet body()}
        <div class="flex flex-row flex-wrap">
            <table class="w-full">
                <thead>
                    <tr>
                        <td><div class="flex flex-row justify-center"><UIcon icon="heart" /></div></td>
                        <td><div class="flex flex-row justify-center"><UIcon icon="swords" /></div></td>
                        <td><div class="flex flex-row justify-center"><UIcon icon="helmet" /></div></td>
                        <td><div class="flex flex-row justify-center"><UIcon icon="boots" /></div></td>
                    </tr>
                </thead>
                <tbody>
                    {#each powersTableData as row}
                        <tr>
                            {#each row as power}
                                {#if power == null}
                                    <td></td>
                                {:else}
                                    <td class="">
                                        <div class="flex w-full flex-row justify-center">
                                            <PowerIcon {power} />
                                        </div>
                                    </td>
                                {/if}
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/snippet}
</SidePanel>
