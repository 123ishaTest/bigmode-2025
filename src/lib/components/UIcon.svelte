<script lang="ts">
    import { base } from '$app/paths';

    interface Props {
        icon: string;
        size?: 'small' | 'medium' | 'large';
    }

    let { icon, size = 'small' }: Props = $props();

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

<img class="pixelated {sizeClass}" src="{base}/images/icons/{icon}.png" alt={icon} />
