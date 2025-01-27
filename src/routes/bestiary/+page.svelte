<script lang="ts">
    import type { IgtGame } from '$lib/game/IgtGame';
    import { getContext } from 'svelte';
    import type { Bestiary } from '$lib/game/features/bestiary/Bestiary';
    import BestiaryCard from '$lib/components/BestiaryCard.svelte';

    let game: IgtGame = getContext('game');
    let bestiary: Bestiary = $derived(game.features.bestiary);
</script>

<div class="mx-auto flex flex-row justify-center p-4">
    <div class="flex w-1/2 min-w-fit flex-col">
        <h2 class="h2 w-full text-center">Bestiary</h2>
        <hr class="hr border-t-8" />

        <!--        <div class="flex flex-row w-full justify-center">-->
        <div class="grid-auto-flow-column grid grid-cols-6 gap-2 p-4">
            {#each bestiary.monsters as monster}
                <BestiaryCard {monster} />
            {/each}
        </div>
        <!--        </div>-->
    </div>
</div>
