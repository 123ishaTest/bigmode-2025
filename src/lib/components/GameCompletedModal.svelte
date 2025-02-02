<script lang="ts">
    import { Modal } from '@skeletonlabs/skeleton-svelte';
    import { base } from '$app/paths';
    import CreditsPeople from '$lib/components/CreditsPeople.svelte';
    import type { IgtGame } from '$lib/game/IgtGame';
    import { getContext } from 'svelte';
    import UIcon from '$lib/components/UIcon.svelte';

    let openState = $state(false);

    function modalClose() {
        openState = false;
    }

    let game: IgtGame = getContext('game');
    game.features.world.onLocationChanged.subscribe((l) => {
        if (l === '/mountains/summit') {
            openState = true;
        }
    });

    let runCount = $derived(game.features.character.runCount);

    let minutes = $derived.by(() => {
        const now = Date.now();
        const duration = now - game.features.character.gameStart;
        return Math.floor(duration / 1000 / 60);
    });
</script>

<Modal
    bind:open={openState}
    triggerBase="hidden"
    contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm w-1/2"
    backdropClasses="backdrop-blur-sm"
>
    {#snippet content()}
        <article>
            <div class="flex flex-col space-y-4">
                <h6 class="h6">
                    You have reached the summit in <span class="font-bold">{runCount}</span> runs and completed the game!
                </h6>

                <p class="text-xs italic">And it only took you {minutes} minutes</p>

                <div class="flex w-full flex-row justify-center">
                    <img class="pixelated h-24 w-24" src="{base}/images/character.png" alt="You" />
                    <img class="pixelated h-24 w-24" src="{base}/images/pig.png" alt="Piggy" />
                </div>

                <div class="flex flex-row items-center space-x-2">
                    <h6 class="h6">Thank you for playing</h6>
                    <UIcon icon="heart" />
                </div>

                <h6 class="h6">
                    Make sure to <a
                        href="https://123ishatest.itch.io/the-road-not-taken"
                        target="_blank"
                        class="underline">give us a rating</a
                    > if you enjoyed the game.
                </h6>
                <br />
                <CreditsPeople />
            </div>
        </article>
        <footer class="flex justify-end gap-4">
            <button type="button" class="btn preset-filled" onclick={modalClose}>Free Play</button>
        </footer>
    {/snippet}
</Modal>
