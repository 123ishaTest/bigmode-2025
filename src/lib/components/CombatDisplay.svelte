<script lang="ts">
    import type { Combat } from '$lib/game/tools/combat/Combat';
    import { Progress } from '@skeletonlabs/skeleton-svelte';

    interface Props {
        combat: Combat;
    }

    let { combat }: Props = $props();
</script>

<div class="flex w-full flex-row justify-around space-x-2">
    <div class="flex w-48 flex-col space-y-2">
        <p>Character</p>
        <!-- TODO(@Isha): Check if updates correctly -->
        <span>{combat.characterScheduledAttack?.description ?? ''}</span>

        <Progress value={combat.character.health} max={combat.character.maxHealth} meterBg="bg-red-500"
            >{combat.character.health.toFixed()}</Progress
        >
        <Progress value={combat.character.cooldown} max={combat.character.maxCooldown} meterBg="bg-blue-500"
            >{combat.character.cooldown.toFixed(2)}</Progress
        >
    </div>

    <div class="flex w-48 flex-col space-y-2">
        <p title={combat.enemy.monster.description}>
            {combat.enemy.monster.name} (Lvl. {combat.enemy.level})
        </p>
        <span>{combat.enemyScheduledAttack?.description ?? ''}</span>
        <Progress value={combat.enemy.health} max={combat.enemy.maxHealth} meterBg="bg-red-500"
            >{combat.enemy.health.toFixed()}</Progress
        >
        <Progress value={combat.enemy.cooldown} max={combat.enemy.maxCooldown} meterBg="bg-blue-500"
            >{combat.enemy.cooldown.toFixed(2)}</Progress
        >
    </div>
</div>
