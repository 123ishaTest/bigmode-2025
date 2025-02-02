<script lang="ts">
    import '../app.css';
    import { setContext } from 'svelte';
    import { ToastProvider } from '@skeletonlabs/skeleton-svelte';

    import { AppBar } from '@skeletonlabs/skeleton-svelte';
    import GitHub from 'lucide-svelte/icons/github';

    import { game } from '$lib/game.svelte';
    import { base } from '$app/paths';
    import RunEndModal from '$lib/components/RunEndModal.svelte';
    import AudioHandler from '$lib/components/AudioHandler.svelte';

    let { children } = $props();
    import { page } from '$app/state';
    import { Bot } from 'lucide-svelte';
    import TutorialModal from '$lib/components/TutorialModal.svelte';
    import GameCompletedModal from '$lib/components/GameCompletedModal.svelte';

    setContext('game', game);

    let highlightIfSelected = (path: string) => {
        return page.url.pathname === `${base}/${path}` ? 'underline' : '';
    };
    import Cover from "$lib/cover.png"
</script>

<svelte:head>
    <meta property="og:image" content="{Cover}"/>
</svelte:head>

<TutorialModal />
<RunEndModal />
<GameCompletedModal />
<AudioHandler />
<AppBar>
    {#snippet lead()}
        <p>The Road Not Taken</p>
    {/snippet}
    {#snippet trail()}
        <a href="http://github.com/123ishatest/bigmode-2025" target="_blank" title="Github">
            <Bot />
        </a>
        <a href="http://github.com/123ishatest/bigmode-2025" target="_blank" title="Github">
            <GitHub />
        </a>
    {/snippet}
    <div class="flex flex-row justify-center space-x-4">
        <a href="{base}/" class={highlightIfSelected('')}>Game</a>
        <a href="{base}/bestiary" class={highlightIfSelected('bestiary')}>Bestiary</a>
        <!--        <a href="{base}/lore" class={highlightIfSelected('lore')}>Lore</a>-->
        <!--        <a href="{base}/achievements" class={highlightIfSelected('achievements')}>Achievements</a>-->
    </div>
</AppBar>

<ToastProvider placement="top-start">
    {@render children()}
</ToastProvider>
