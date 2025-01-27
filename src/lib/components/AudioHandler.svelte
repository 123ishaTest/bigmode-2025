<script lang="ts">
    import type { IgtGame } from '$lib/game/IgtGame';
    import { getContext, onMount } from 'svelte';
    import { Howl, Howler } from 'howler';
    import type { Soundtrack } from '$lib/game/features/soundtracks/Soundtrack';
    import { base } from '$app/paths';

    const game: IgtGame = getContext('game');

    let oldSound: Howl | undefined = $state();
    let currentSound: Howl | undefined = $state();

    onMount(() => {
        Howler.unload();
        Howler.volume(game.features.settings.isMuted ? 0 : 1);

        game.features.soundtracks.onPlaySoundtrack.subscribe((track: Soundtrack) => {
            oldSound?.unload();
            oldSound = currentSound;
            oldSound?.fade(oldSound?.volume(), 0, 2000);
            setTimeout(() => {
                oldSound?.unload();
            }, 2000);
            currentSound = new Howl({
                src: [`${base}${track.track}`],
            });
            currentSound.play();
            currentSound.fade(0, track.volume, track.fadeInDuration);
        });
        game.features.soundtracks.playSound('Guitar Theme');
        game.features.settings.onIsMutedChanged.subscribe((muted: boolean) => {
            Howler.volume(muted ? 0 : 1);
        });
    });
</script>
