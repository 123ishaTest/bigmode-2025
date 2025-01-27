<script lang="ts">
    import '../app.css';
    import { setContext } from 'svelte';

    import { AppBar } from '@skeletonlabs/skeleton-svelte';
    import GitHub from 'lucide-svelte/icons/github';

    import { game } from '$lib/game.svelte';
    import { base } from '$app/paths';
    import RunEndModal from '$lib/components/RunEndModal.svelte';

    let { children } = $props();

    setContext('game', game);

    import { Howl } from 'howler';

    const guitar = new Howl({
        src: [`${base}/soundtracks/guitar-theme.mp3`],
        volume: 0,
    });

    const desert = new Howl({
        src: [`${base}/soundtracks/desert.mp3`],
        volume: 0,
    });

    guitar.play();
    desert.play();

    const startGuitar = () => {
        desert.fade(desert.volume(), 0, 4000);
        guitar.fade(guitar.volume(), 0.6, 6000);
    };

    const startDesert = () => {
        guitar.fade(guitar.volume(), 0, 4000);
        desert.fade(desert.volume(), 0.6, 6000);
    };

</script>

<button class="btn" onclick={() => startGuitar()}>Guitar</button>
<button class="btn" onclick={() => startDesert()}>Desert</button>

<RunEndModal />
<AppBar>
    {#snippet lead()}
        <p>Super secret game name</p>
    {/snippet}
    {#snippet trail()}
        <a href="http://github.com/123ishatest/bigmode-2025" target="_blank" title="Github">
            <GitHub />
        </a>
    {/snippet}
    <div class="flex flex-row justify-center space-x-4">
        <a href="{base}/" class="underline">Game</a>
        <a href="{base}/bestiary">Bestiary</a>
        <a href="{base}/lore">Lore</a>
        <a href="{base}/achievements">Achievements</a>
        <a href="{base}/settings">Settings</a>
    </div>
</AppBar>

{@render children()}
