<script lang="ts">
    import { getContext } from 'svelte';
    import type { IgtGame } from '$lib/game/IgtGame';
    import SidePanel from '$lib/components/SidePanel.svelte';
    import type { Settings } from '$lib/game/features/settings/Settings.svelte';

    const game: IgtGame = getContext('game');

    let settings: Settings = $derived(game.features.settings);

    const toggleMute = () => {
        settings.toggleMute();
    };
</script>

<SidePanel>
    {#snippet title()}
        <h3 class="h3">Settings</h3>
    {/snippet}
    {#snippet body()}
        <label class="flex items-center space-x-2">
            <span>Mute</span>
            <input class="checkbox" type="checkbox" onchange={toggleMute} checked={settings.isMuted} />
        </label>
        <button
            type="button"
            class="btn bg-red-500"
            onclick={() => {
                const res = confirm('Are you sure you want to completely reset your save?');
                if (res) {
                    game.deleteSave();
                    location.reload();
                }
            }}
            >Hard Reset
        </button>
    {/snippet}
</SidePanel>
