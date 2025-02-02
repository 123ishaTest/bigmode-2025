<script lang="ts">
    import type { Monster } from '$lib/game/features/bestiary/Monster';
    import { base } from '$app/paths';
    import { AreaId } from '$lib/game/features/world/AreaId';
    import UIcon from '$lib/components/UIcon.svelte';

    interface Props {
        monster: Monster;
        killed: number;
        killedBy: number;
    }

    let { monster, killed, killedBy }: Props = $props();

    let bgClass = $derived.by(() => {
        switch (monster.area) {
            case AreaId.Mountains:
                return 'preset-filled-tertiary-100-900 border-tertiary-200-800 divide-tertiary-200-800';
            case AreaId.Forest:
                return 'preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800';
            case AreaId.Desert:
                return 'preset-filled-warning-100-900 border-warning-200-800 divide-warning-200-800';
            case AreaId.Riverlands:
                return 'preset-filled-success-100-900 border-success-200-800 divide-success-200-800';
            default:
                console.error('Unknown area', monster);
                return '';
        }
    });

    const handleError = (ev: Event) => {
        (ev.target as HTMLImageElement).src = `${base}/images/powers/empty.png`;
    };

    let isDiscovered: boolean = $derived(killed > 0);
</script>

<div class="card card-hover block divide-y overflow-hidden border-[1px] {bgClass} min-w-36">
    <header class="flex flex-col items-center">
        <img
            src="{base}/images{monster.icon ?? '/powers/empty.png'}"
            alt={monster.name}
            onerror={handleError}
            class="pixelated w-24 {!isDiscovered ? 'brightness-0' : ''}"
        />
    </header>

    <article class="p-4">
        <div class="flex flex-col">
            <h5 class="h5 text-center">{isDiscovered ? monster.name : '???'}</h5>

            <div class="flex-1"></div>

            <div class="flex flex-row justify-between">
                <div class="flex flex-col items-center" title="Kills">
                    <UIcon icon="swords" />
                    <h6 class="h6">{killed}</h6>
                </div>
                <div class="flex flex-col items-center" title="Deaths">
                    <UIcon icon="skull" />
                    <h6 class="h6">{killedBy}</h6>
                </div>
            </div>
        </div>
    </article>
</div>
