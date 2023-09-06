<script>

import {page} from "$app/stores"
console.log("PAGE DATA: ",$page.params)
const numPag = $page.params.slug
console.log("PAGINA PARAM: ",numPag)


const tituloPag = $page.data.guides
console.log("PAGINA PARAM: ",tituloPag)

</script>

<div class="guide">
    <h2>ID: {numPag}</h2>
    <p>title: {$page.data.guides[numPag-1].title}</p>
</div>

<style>
    .guide{
        margin-top:40px;
        padding: 10px;
        border: 1px dotted rgba(255,255,255,0.2);
    }
</style>