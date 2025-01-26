<script lang="ts">
    import WorldMap from '$lib/components/WorldMap.svelte';
    import StatsDisplay from '$lib/components/StatsDisplay.svelte';
    import PowersDisplay from '$lib/components/PowersDisplay.svelte';
</script>

<div class="flex w-full flex-row">
    <div class="flex w-96 flex-col space-y-2 p-4">
        <StatsDisplay />
        <p class="h-64 border-2 border-primary-200 p-2">Items go here</p>
    </div>
    <div class="flex flex-grow flex-col p-4">
        <WorldMap></WorldMap>
    </div>
    <div class="flex w-96 flex-col space-y-2 p-4">
        <PowersDisplay />
        <p class="h-64 border-2 border-primary-200 p-2">Key Items go here</p>
    </div>
</div>
