<script lang="ts">
	import { fade, slide, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import axios from 'axios';
	import { userDataStore } from '../stores/userDataStore';
	import BreedsDetails from './BreedsDetails.svelte';
	import { deleteSnippet, toggleFavorite } from '../stores/SnippetStore';
	import { writable } from 'svelte/store';
  import { Toast, getToastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';

const toastStore = getToastStore();
	// Create a writable store for the selected breed
	const selectedBreedStore = writable('');


	let breeds: string[];
    let breedsAll: any[]=[]
	let isLog: boolean | null = null; // Initialize to null or a default value

	// Subscribe to changes in the store
	userDataStore.subscribe((userData) => {
		isLog = userData.isLog;
		console.log('isLOg: ', isLog);
	});

	type ApiDog = {
        next: string
		resultIds: string[];
		total: number;
	};
	const test = 'Pug';

	const getFetch = async () => {
		axios
			.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
				withCredentials: true // Set withCredentials to true
			})
			.then((res) => {
				console.log('DATOS');
				console.log(res);
				breedsAll = res.data;
			})
			.catch((error) => {
				console.error(error); // Handle any errors here
			});
	};
	getFetch();
    
	const tryGet = () => {
		console.log("ENTRA TRYGET");
		console.log("Seleccionado: ", selectedBreed)


  axios
    .get(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${selectedBreed}`, {
      withCredentials: true // Set withCredentials to true
    })
    .then((res) => {
      console.log("DATOS");
      console.log(res.data);
      
      breeds = res.data.resultIds.map((resultId: string) => {
  return {
    resultIds: resultId,
    total: res.data.total,
  };
});


const t: ToastSettings = {
	message: "There are " + res.data.total +" "+selectedBreed+"!!!",
	timeout: 10000
};
toastStore.trigger(t);

console.log("TOTAL: ",res.data.total)
      console.log("BREEDS: ", breeds);
    })
    .catch((error) => {
      console.error(error); // Handle any errors here
    });
};

let isDropdownOpen = false;
  let selectedBreed = '';

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function selectBreed(breed: string) {
		selectedBreedStore.set(breed); // 
    selectedBreed = breed;
    isDropdownOpen = false;
    console.log("ENTRA SELECTBREED: ", selectedBreed)
    tryGet()
  }

</script>

<Toast />

<!-- <AppShell>...</AppShell> -->

{#if isLog === true}
<div class="breed-input">
  <input
    type="text"
    placeholder="Select a breed"
    readonly
    on:click={toggleDropdown}
    value={selectedBreed}
  />

  {#if isDropdownOpen}
    <ul class="breed-options">
      {#each breedsAll as breed (breed)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li class="breed-option" on:click={() => selectBreed(breed)}>{breed}</li>
      {/each}
    </ul>
  {/if}
</div>
	<div class="poll-list">
		{#each breedsAll as dogBreeds, index}
			<div in:slide out:scale|local>
				<header>
					<div class="float-right">
						<button
							type="button"
							class="btn btn-sm variant-filled-secondary">
							w
						</button>
						<button
							type="button"
							class="btn btn-sm variant-filled-error">
							x
						</button>
					</div>
				</header>
				<BreedsDetails {dogBreeds} />
			</div>
		{/each}
	</div>
{:else}
	<h1 class="h1">Inicia para ver</h1>
{/if}

<style>
	.poll-list {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 20px;
	}
  /* Add your styles for the input and dropdown here */
  .breed-options {
    max-height: 150px; /* Adjust the maximum height as needed */
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 600px;
    text-align: center;
  }
  .breed-input {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    padding: 12px;
    margin: 24px;
    align-items: center;
  }

  input{
    width: 600px;
  }

  .breed-option {
    cursor: pointer;
    padding: 8px;
    border-bottom: 1px solid #ccc;
  }
  .breed-option:last-child {
    border-bottom: none; /* Remove border from the last option */
  }
</style>
