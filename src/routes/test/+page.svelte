<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

{#each data.pruebas as pdata}
<p>id: {pdata.id}</p>
<p>texto: {pdata.text}</p>
{/each}