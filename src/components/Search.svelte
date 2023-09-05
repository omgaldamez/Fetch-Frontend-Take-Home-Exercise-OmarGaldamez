<script lang="ts">
	import { slide, scale } from 'svelte/transition';
	import axios from 'axios';
	import { userDataStore } from '../stores/userDataStore';
	import BreedsDetails from './BreedsDetails.svelte';
	import { writable } from 'svelte/store';
	import { Avatar, Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	// Create a writable store for the selected breed
	const selectedBreedStore = writable('');

let isDogSelect: boolean = false

	let breeds: string[];
	let breedsAll: any[] = [];
	let isLog: boolean | null = null; // Initialize to null or a default value

	// let resImg: string[]
	// let resName: string[]
	//   let resAge: number[]
	//   let resBreed: string[]
	//   let resZC: string[]
	//   let resID: string[]

	let resData: any[];

	// Subscribe to changes in the store
	userDataStore.subscribe((userData) => {
		isLog = userData.isLog;
		console.log('isLOg: ', isLog);
	});

	type ApiDog = {
		next: string;
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
		console.log('ENTRA TRYGET');
		console.log('Seleccionado: ', selectedBreed);

		axios
			.get(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${selectedBreed}`, {
				withCredentials: true // Set withCredentials to true
			})
			.then((res) => {
				console.log('DATOS');
				console.log(res.data);

				breeds = res.data.resultIds.map((resultId: string) => {
					return {
						resultIds: resultId,
						total: res.data.total
					};
				});

				const t: ToastSettings = {
					message: 'There are ' + res.data.total + ' ' + selectedBreed + '!!!',
					timeout: 10000
				};
				toastStore.trigger(t);

				console.log('TOTAL: ', res.data.total);
				console.log('BREEDS: ', breeds);
				console.log('ID RAZA: ', res.data.resultIds);
				postDogs(res.data.resultIds);
			})
			.catch((error) => {
				console.error(error); // Handle any errors here
			});
	};

	const postDogs = async (dogsId: string[]) => {
    console.log('dogsID: ', dogsId);

    axios
        .post(
            'https://frontend-take-home-service.fetch.com/dogs',
            dogsId,
            {
                withCredentials: true // Set withCredentials to true for cookies
            }
        )
        .then((res) => {
            // Access and log response headers (cookies)
            const cookies = res.headers['set-cookie'];
            if (cookies) {
                console.log('Cookies received:', cookies);
            }

            // Log the response data if needed
            console.log('Response data:', res.data);

 resData = res.data
 isDogSelect=true

            // Now resData should be an array of objects
            console.log(resData);
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
		console.log('ENTRA SELECTBREED: ', selectedBreed);
		tryGet();
	}

	
	let currentVariant = 'bg-initial';
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

{#if isDogSelect===true}
<div class="dogCards">
	{#each resData as breedSel}
	<div class="dC">
    <header>
        <img src={breedSel.img}  alt="Post" />
    </header>
    <div class="p-4 space-y-4">
        <h6 class="h6" data-toc-ignore>Age: {breedSel.age} years</h6>
        <h3 class="h3" data-toc-ignore>Name: {breedSel.name}</h3>
    </div>
    <hr class="opacity-50" />
    <footer class="p-4 flex justify-start items-center space-x-4">
        <Avatar src={"./fetchLogo.svg"} width="w-8" />
        <div class="flex-auto flex justify-between items-center">
            <h6 class="font-bold" data-toc-ignore>Zip Code: {breedSel.zip_code}</h6>
            <small>On {new Date().toLocaleDateString()}</small>
        </div>
    </footer>
</div>
{/each}
</div>
{/if}

{:else}
	<h1 class="h1">Inicia para ver</h1>
{/if}

<style>
  .dogCards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .dC {
    width: 300px; /* Set a fixed width for the cards */
    margin: 18px;
    border: 1px solid #333;
    display: flex;
    flex-direction: column;
  }

  .dC header {
    max-height: 200px; /* Set a max-height for the header (image) */
    overflow: hidden; /* Hide overflow for taller images */
    text-align: center;
  }

  .dC header img {
    max-width: 100%; /* Ensure the image doesn't exceed the card's width */
    height: auto;
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

	input {
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
