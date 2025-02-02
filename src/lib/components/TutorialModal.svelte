<script lang="ts">
    import { Modal } from '@skeletonlabs/skeleton-svelte';
    import { base } from '$app/paths';
    import CreditsPeople from '$lib/components/CreditsPeople.svelte';

    let openState = $state(true);

    function modalClose() {
        openState = false;
    }
</script>

<Modal
    bind:open={openState}
    triggerBase="hidden"
    contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-screen-sm md:w-1/2"
    backdropClasses="backdrop-blur-sm"
>
    {#snippet content()}
        <article>
            <div class="flex flex-col space-y-4">
                <div class="flex w-full flex-row justify-center">
                    <img class="pixelated h-24 w-24" src="{base}/images/character.png" alt="You" />
                    <img class="pixelated h-24 w-24" src="{base}/images/pig.png" alt="Piggy" />
                </div>
                <h6 class="h6">You are sent to explore the world by the gods, facing deadly creatures.</h6>
                <h6 class="h6">
                    When you eventually meet your end, the gods spare you and grant you powers based on your performance
                    that run.
                </h6>
                <h6 class="h6">Select locations on the map to travel through various areas, finding powerful items.</h6>
                <h6 class="h6">Can you reach the summit and clear the game?</h6>
                <br />

                <CreditsPeople />
            </div>
        </article>
        <footer class="flex justify-end gap-4">
            <button type="button" class="btn preset-filled" onclick={modalClose}>Start!</button>
        </footer>
    {/snippet}
</Modal>
