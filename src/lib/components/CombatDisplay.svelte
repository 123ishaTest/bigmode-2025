<script lang="ts">
    import type { Combat } from '$lib/game/tools/combat/Combat';
    import { Progress } from '@skeletonlabs/skeleton-svelte';
    import MonsterIcon from '$lib/components/MonsterIcon.svelte';

    interface Props {
        combat: Combat;
    }

    let { combat }: Props = $props();
</script>

<div class="flex w-full flex-row justify-around space-x-2">
    <div class="flex w-48 flex-col items-center space-y-2">
        <p>You</p>

        <div class="h-24 w-24"></div>

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

    <div class="flex w-48 flex-col items-center space-y-2">
        <p>{combat.enemy.monster.name} (Lvl. {combat.enemy.level})</p>

        <MonsterIcon monster={combat.enemy.monster} size="large"></MonsterIcon>

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
