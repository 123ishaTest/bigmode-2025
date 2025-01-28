<script lang="ts">
    import { base } from '$app/paths';
    import type { Monster } from '$lib/game/features/bestiary/Monster';

    interface Props {
        monster: Monster;
        size?: 'small' | 'medium' | 'large';
        showLevel?: boolean;
    }

    let { monster, size = 'medium' }: Props = $props();
    let path = $derived(monster.icon);

    let sizeClass = $derived.by(() => {
        switch (size) {
            case 'small':
                return 'w-8 h-8';
            case 'medium':
                return 'w-16 h-16';
            case 'large':
                return 'w-24 h-24';
        }
    });
</script>

<img class="pixelated {sizeClass}" src="{base}/images/{path}" alt={path} />
