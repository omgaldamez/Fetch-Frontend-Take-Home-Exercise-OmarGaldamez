<script lang="ts">
import Test from "../../components/Test.svelte";
</script>

<div class="h-full w-4/5 mx-auto justify-center items-center">
<Test></Test>
</div>

<!-- <script lang="ts">
    import axios from "axios"
  import { userDataStore } from "../../stores/userDataStore"

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
<h1 class="h1">ENTRA TEST</h1>

<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut excepturi at possimus officiis explicabo earum porro consequuntur officia voluptates laborum. Quaerat quos voluptates nobis? Voluptas iste delectus dolore explicabo incidunt!</p>

{#each breeds as dogBreeds ,index }
<p>{dogBreeds}</p>    
{/each}

{:else}
<h1 class="h1">Inicia para ver</h1>
{/if} -->