<script lang="ts">
    import { Progress } from '@skeletonlabs/skeleton-svelte';
    import MonsterIcon from '$lib/components/MonsterIcon.svelte';
    import type { IgtGame } from '$lib/game/IgtGame';
    import { getContext } from 'svelte';
    import { base } from '$app/paths';
    import SidePanel from '$lib/components/SidePanel.svelte';
    import KeyItemsDisplay from '$lib/components/KeyItemsDisplay.svelte';
    import UIcon from '$lib/components/UIcon.svelte';

    let game: IgtGame = getContext('game');
    let character = $derived(game.features.character);

    let combat = $derived(character.currentObstacle);

    let format = (n: number): string => {
        if (n > 10) {
            return n.toFixed(0);
        }
        return n.toFixed(2);
    };
</script>

<SidePanel>
    {#snippet title()}
        <h3 class="h3">Combat</h3>
    {/snippet}
    {#snippet body()}
        <div class="flex flex-col space-y-2">
            <KeyItemsDisplay />
            <div class="flex flex-col items-center space-y-2">
                <img class="pixelated h-24 w-24" src="{base}/images/character.png" alt="You" />

                <table class="table table-fixed">
                    <tbody>
                        <tr>
                            <td>{Math.ceil(character.health).toFixed()}/{Math.ceil(character.maxHealth).toFixed()}</td>
                            <td>
                                <Progress value={character.health} max={character.maxHealth} meterBg="bg-red-500" />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <Progress
                                    value={combat?.character.cooldown ?? 1}
                                    max={combat?.character.maxCooldown ?? 1}
                                    meterBg="bg-blue-500"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex w-full flex-row justify-around">
                <div class="flex flex-col items-center">
                    <UIcon icon="heart" />
                    <span>{format(character.maxHealth)}</span>
                </div>
                <div class="flex flex-col items-center">
                    <UIcon icon="swords" />
                    <span>{format(character.meleeAttack)}</span>
                </div>
                <div class="flex flex-col items-center">
                    <UIcon icon="helmet" />
                    <span>{format(character.meleeDefense)}</span>
                </div>
                <div class="flex flex-col items-center">
                    <UIcon icon="boots" />
                    <span>{format(character.travelSpeed)}</span>
                </div>
                <div class="flex flex-col items-center">
                    <UIcon icon="clock" />
                    <span>{format(character.combatSpeed)}</span>
                </div>
            </div>
        </div>

        <div class="flex flex-grow flex-col items-center space-y-2">
            {#if combat}
                <p>Lvl. {combat.enemy.level} {combat.enemy.monster.name}</p>

                <MonsterIcon monster={combat.enemy.monster} size="large"></MonsterIcon>

                <table class="table table-fixed">
                    <tbody>
                        <tr>
                            <td
                                >{Math.ceil(combat.enemy.health).toFixed()}/{Math.ceil(
                                    combat.enemy.maxHealth,
                                ).toFixed()}</td
                            >
                            <td>
                                <Progress
                                    value={combat.enemy.health}
                                    max={combat.enemy.maxHealth}
                                    meterBg="bg-red-500"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><span>{combat.enemyScheduledAttack?.description ?? ''}</span></td>
                            <td>
                                <Progress
                                    value={combat.enemy.cooldown}
                                    max={combat.enemy.maxCooldown}
                                    meterBg="bg-blue-500"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class="flex w-full flex-row justify-around">
                    <div class="flex flex-col items-center">
                        <UIcon icon="heart" />
                        <span>{format(combat.enemy.maxHealth)}</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <UIcon icon="swords" />
                        <span>{format(combat.enemy.meleeAttack)}</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <UIcon icon="helmet" />
                        <span>{format(combat.enemy.meleeDefense)}</span>
                    </div>
                </div>
            {/if}
        </div>
    {/snippet}
</SidePanel>
