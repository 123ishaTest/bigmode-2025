<script lang="ts">
    import type { Monster } from '$lib/game/features/bestiary/Monster';
    import { base } from '$app/paths';
    import { AreaId } from '$lib/game/features/world/AreaId';

    interface Props {
        monster: Monster;
    }

    let { monster }: Props = $props();

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
</script>

<div class="card card-hover block divide-y overflow-hidden border-[1px] {bgClass}">
    <header>
        <img
            src="{base}/images/{monster.icon ?? 'powers/empty.png'}"
            alt={monster.name}
            class="aspect-[21/16] w-full"
        />
    </header>

    <article class="space-y-4 p-4">
        <div class="flex flex-col">
            <h4 class="h4 text-center">{monster.name}</h4>

            <div class="flex-1"></div>

            <div class="flex flex-row justify-between">
                <h6 class="h6">⚔️ {3}</h6>
                <h6 class="h6">☠️ {1}</h6>
            </div>
        </div>
    </article>
</div>
