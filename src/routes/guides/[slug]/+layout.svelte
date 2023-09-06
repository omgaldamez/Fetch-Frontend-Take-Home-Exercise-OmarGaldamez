<script>
    import {page} from "$app/stores"
const numPag = $page.params.slug
    </script>
    
    <header>
        {#if $page.route.id === '/guides/[slug]'}
        <h1>Header for Slug {numPag}</h1>

      {/if}
    </header>
    
    <main>
        <slot></slot>
    </main>
    
    <footer>
    </footer>
    
    <style>
        header{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            justify-content: flex-start;
            width: 80vw;
            height: auto;
            text-align: center;
            margin: 20px auto;
        }
        main{
            display: flex;
            justify-content: center;
        }
        footer{
            text-align: center;
        }
      
    
    </style>