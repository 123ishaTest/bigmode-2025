<script lang="ts">
    import { base } from '$app/paths';
    import { goto } from '$app/navigation';

    setTimeout(() => {
        goto(`/${base}`);
    }, 100);
</script>
<div class="p-4">
    <p>
        If you see this page, it means that Itch messed up their URL
    </p>
    <br>
    <p>
        Please <a class="underline" href="/{base}">play the game here</a>
    </p>
</div>