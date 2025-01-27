<script lang="ts">
    import type { Combat } from '$lib/game/tools/combat/Combat';
    import { Progress } from '@skeletonlabs/skeleton-svelte';
    import type { Fightable } from '$lib/game/tools/combat/Fightable';

    interface Props {
        combat: Combat;
    }

    let { combat }: Props = $props();
</script>

<div class="flex w-full flex-row justify-around space-x-2">
    <div class="flex w-48 flex-col space-y-2">
        <p class="text-center">You</p>

        <table class="table table-fixed">
            <tbody>
                <tr>
                    <td>{combat.character.health.toFixed()}/{combat.character.maxHealth.toFixed()}</td>
                    <td>
                        <Progress
                            value={combat.character.health}
                            max={combat.character.maxHealth}
                            meterBg="bg-red-500"
                        />
                    </td>
                </tr>
                <tr>
                    <td><span>{combat.characterScheduledAttack?.description ?? ''}</span></td>
                    <td>
                        <Progress
                            value={combat.character.cooldown}
                            max={combat.character.maxCooldown}
                            meterBg="bg-blue-500"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="flex w-48 flex-col space-y-2">
        <p class="text-center">
            {combat.enemy.monster.name} (Lvl. {combat.enemy.level})
        </p>

        <table class="table table-fixed">
            <tbody>
                <tr>
                    <td>{combat.enemy.health.toFixed()}/{combat.enemy.maxHealth.toFixed()}</td>
                    <td>
                        <Progress value={combat.enemy.health} max={combat.enemy.maxHealth} meterBg="bg-red-500" />
                    </td>
                </tr>
                <tr>
                    <td><span>{combat.enemyScheduledAttack?.description ?? ''}</span></td>
                    <td>
                        <Progress value={combat.enemy.cooldown} max={combat.enemy.maxCooldown} meterBg="bg-blue-500" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
