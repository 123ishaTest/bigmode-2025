<script lang="ts">
    import { getContext } from 'svelte';
    import type { IgtGame } from '$lib/game/IgtGame';
    import { Progress } from '@skeletonlabs/skeleton-svelte';

    const game: IgtGame = getContext('game');
    let character = $derived(game.features.character);
</script>

<div>
    <h2 class="h2">Stats</h2>
    <table class="table">
        <tbody>
            <tr>
                <td>Health</td>
                <td>
                    <Progress value={character.health} max={character.maxHealth} meterBg="bg-red-500"
                        >{character.health.toFixed()}/{character.maxHealth.toFixed(0)}</Progress
                    >
                </td>
            </tr>
            <tr>
                <td>Attack</td>
                <td>{character.meleeAttack}</td>
            </tr>
            <tr>
                <td>Defense</td>
                <td>{character.meleeDefense}</td>
            </tr>
        </tbody>
    </table>
</div>
