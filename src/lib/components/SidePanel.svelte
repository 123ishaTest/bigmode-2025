<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        title?: Snippet;
        body?: Snippet;
        footer?: Snippet;
    }

    let { title, body, footer }: Props = $props();
</script>

<div
    class="card block max-w-md divide-y overflow-hidden rounded-md border-[1px] shadow-md border-surface-200-800 divide-surface-200-800 preset-filled-surface-100-900"
>
    {#if title}
        <header class="p-1 text-center">
            {@render title()}
        </header>
    {/if}
    {#if body}
        <article class="space-y-4 p-4">
            {@render body()}
        </article>
    {/if}

    {#if footer}
        <footer class="flex items-center justify-between gap-4 p-4">
            {@render footer()}
        </footer>
    {/if}
</div>
