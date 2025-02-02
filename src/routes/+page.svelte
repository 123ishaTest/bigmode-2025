<script lang="ts">
    import WorldMap from '$lib/components/WorldMap.svelte';
    import PowersDisplay from '$lib/components/PowersDisplay.svelte';
    import SettingsDisplay from '$lib/components/SettingsDisplay.svelte';
    import CombatDisplay from '$lib/components/CombatDisplay.svelte';
</script>

<div class="flex w-full flex-col md:flex-row">
    <div class="flex md:w-96 sm:w-full flex-col space-y-4 p-4">
        <CombatDisplay />
    </div>
    <div class="flex flex-grow flex-col p-4">
        <WorldMap></WorldMap>
    </div>
    <div class="flex md:w-96 flex-col space-y-4 p-4">
        <PowersDisplay />

        <div>
            <SettingsDisplay />
        </div>
    </div>
</div>
