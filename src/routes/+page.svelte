<script lang="ts">
    import WorldMap from '$lib/components/WorldMap.svelte';
    import PowersDisplay from '$lib/components/PowersDisplay.svelte';
    import SettingsDisplay from '$lib/components/SettingsDisplay.svelte';
    import CombatDisplay from '$lib/components/CombatDisplay.svelte';
</script>

<div class="flex w-full flex-row">
    <div class="flex w-96 flex-col space-y-4 p-4">
        <CombatDisplay />
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
