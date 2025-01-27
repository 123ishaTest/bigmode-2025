<script lang="ts">
    import WorldMap from '$lib/components/WorldMap.svelte';
    import StatsDisplay from '$lib/components/StatsDisplay.svelte';
    import PowersDisplay from '$lib/components/PowersDisplay.svelte';
    import KeyItemsDisplay from '$lib/components/KeyItemsDisplay.svelte';
    import SettingsDisplay from '$lib/components/SettingsDisplay.svelte';
</script>

<div class="flex w-full flex-row">
    <div class="flex w-96 flex-col space-y-4 p-4">
        <StatsDisplay />
        <KeyItemsDisplay />
    </div>
    <div class="flex flex-grow flex-col p-4">
        <WorldMap></WorldMap>
    </div>
    <div class="flex w-96 flex-col space-y-4 p-4">
        <PowersDisplay />

        <div>
            <SettingsDisplay />
        </div>
    </div>
</div>
