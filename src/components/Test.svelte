<script lang="ts">
    import {fade, slide, scale} from "svelte/transition"
    import {flip} from "svelte/animate"
    import axios from "axios"
  import { userDataStore } from "../stores/userDataStore"
  import BreedsDetails from "./BreedsDetails.svelte";
  import { deleteSnippet, toggleFavorite } from "../stores/SnippetStore";

let breeds: any[] = []
  let isLog: boolean | null = null; // Initialize to null or a default value
		// Subscribe to changes in the store
		userDataStore.subscribe((userData) => {
		isLog = userData.isLog;
		console.log('isLOg: ', isLog);
	});


    

    const getFetch = (async() => {

axios.get("https://frontend-take-home-service.fetch.com/dogs/breeds", {
withCredentials: true // Set withCredentials to true
})
.then(res => {
console.log("DATOS")
console.log(res)
breeds=res.data
})
.catch(error => {
console.error(error); // Handle any errors here
});
})
getFetch()

</script>



{#if isLog === true}
<div class="poll-list">
    {#each breeds as dogBreeds ,index }
    <div in:slide out:scale|local >
        <header>
        <div class="float-right">
			<button type="button" class="btn btn-sm variant-filled-secondary" on:click={() => toggleFavorite(dogBreeds)}> 
                w
            </button>
			<button type="button" class="btn btn-sm variant-filled-error" on:click={() => deleteSnippet(dogBreeds)}> 
                x 
            </button>
		</div>
    </header>
        <BreedsDetails {dogBreeds}/>
    </div>
    {/each}
    </div>
    {:else}
    <h1 class="h1">Inicia para ver</h1>
    {/if}
    
    <style>
        .poll-list{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
      }
    </style>

    