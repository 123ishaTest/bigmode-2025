<script lang="ts">
    import type { IgtGame } from '$lib/game/IgtGame';
    import { getContext } from 'svelte';
    import type { Bestiary } from '$lib/game/features/bestiary/Bestiary.svelte';
    import BestiaryCard from '$lib/components/BestiaryCard.svelte';

    let game: IgtGame = getContext('game');
    let bestiary: Bestiary = $derived(game.features.bestiary);
</script>

<div class="mx-auto flex flex-row justify-center">
    <div class="flex w-1/2 min-w-fit flex-col">
        <div class="grid-auto-flow-column grid grid-cols-6 gap-2 gap-y-4 p-4">
            {#each bestiary.monsters as monster}
                <BestiaryCard
                    {monster}
                    killed={bestiary.getKills(monster.id)}
                    killedBy={bestiary.getDeaths(monster.id)}
                />
            {/each}
        </div>
    </div>
</div>
