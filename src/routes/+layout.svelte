<script lang="ts">
    import '../app.css';
    import { setContext } from 'svelte';

    import { AppBar } from '@skeletonlabs/skeleton-svelte';
    import GitHub from 'lucide-svelte/icons/github';

    import { game } from '$lib/game.svelte';
    import { base } from '$app/paths';
    import RunEndModal from '$lib/components/RunEndModal.svelte';
    import AudioHandler from '$lib/components/AudioHandler.svelte';

    let { children } = $props();

    setContext('game', game);
</script>

<RunEndModal />
<AudioHandler />
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
