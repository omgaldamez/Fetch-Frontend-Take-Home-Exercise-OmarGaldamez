<script lang="ts">
	import axios from 'axios'; 
	import { userDataStore } from '../stores/userDataStore'; 
	import { writable } from 'svelte/store'; 
	import { Avatar, Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton'; // Import type definition for toast settings

	const toastStore = getToastStore(); 

	// Create a writable store for the selected breed
	const selectedBreedStore = writable('');

	let isDogSelect: boolean = false; 

	let breeds: string[]; 
	let breedsAll: any[] = []; 
	let isLog: boolean | null = null; 

	let resData: any[]; 

	// Subscribe to changes in the user data store
	userDataStore.subscribe((userData) => {
		isLog = userData.isLog; 
	});

	type ApiDog = {
		next: string;
		resultIds: string[];
		total: number;
	};
	const test = 'Pug';

	// Function to fetch all available dog breeds
	const getFetch = async () => {
		axios
			.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
				withCredentials: true
			})
			.then((res) => {
				breedsAll = res.data; // Store all available dog breeds
			})
			.catch((error) => {
				console.error(error); 
			});
	};
	getFetch(); // Fetch available dog breeds when the component is initialized

	// Function to search for dogs based on the selected breed
	const tryGet = () => {
		axios
			.get(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${selectedBreed}&size=${"50"}`, {
				withCredentials: true
			})
			.then((res) => {
				// Process and store the search results
				breeds = res.data.resultIds.map((resultId: string) => {
					return {
						resultIds: resultId,
						total: res.data.total
					};
				});

				// Display a toast notification with the search results
				const t: ToastSettings = {
					message: 'There are ' + res.data.total + ' ' + selectedBreed + '!!!',
					timeout: 10000
				};
				toastStore.trigger(t);

				postDogs(res.data.resultIds); // Call a function to fetch dog details based on search results
			})
			.catch((error) => {
				console.error(error); 
			});
	};

	// Function to fetch details of selected dogs
	const postDogs = async (dogsId: string[]) => {
		axios
			.post('https://frontend-take-home-service.fetch.com/dogs', dogsId, {
				withCredentials: true
			})
			.then((res) => {
				resData = res.data; 
				isDogSelect = true; 
			})
			.catch((error) => {
				console.error(error); 
			});
	};

	let isDropdownOpen = false; 
	let selectedBreed = ''; 

	// Function to toggle the dropdown state
	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	// Function to select a breed and trigger the search
	function selectBreed(breed: string) {
		selectedBreedStore.set(breed); 
		selectedBreed = breed; 
		isDropdownOpen = false;
		tryGet(); // Trigger the search for dogs of the selected breed
	}

</script>

<Toast />

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

{#if isDogSelect === true}
	<div class="dogCards">
		{#each resData as breedSel}
			<div class="dC">
				<header>
					<img src={breedSel.img} alt="Post" />
				</header>
				<div class="p-4 space-y-4">
					<h6 class="h6" data-toc-ignore>Age: {breedSel.age} years</h6>
					<h3 class="h3" data-toc-ignore>Name: {breedSel.name}</h3>
				</div>
				<hr class="opacity-50" />
				<footer class="p-4 flex justify-start items-center space-x-4">
					<Avatar src={'./fetchLogo.svg'} width="w-8" />
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
		width: 300px; 
		margin: 18px;
		border: 1px solid #333;
		display: flex;
		flex-direction: column;
	}

	.dC header {
		max-height: 200px; 
		overflow: hidden; 
		text-align: center;
	}

	.dC header img {
		max-width: 100%;
		height: auto;
	}
	/* Add your styles for the input and dropdown here */
	.breed-options {
		max-height: 150px; 
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
		border-bottom: none; 
	}
</style>


<!-- Code Description:

The Search.svelte component is responsible for allowing users to search for dogs by breed and displaying the search results. Here's a breakdown of the code:

Script Section:

Imports necessary libraries and components, including Axios for making HTTP requests and Skeleton components for UI elements.
Creates a writable store (selectedBreedStore) to store the selected breed.
Declares variables for tracking the state of the component, including isDogSelect to indicate if dogs are selected, breeds to store dog breeds,
 breedsAll to store all available dog breeds, and isLog to track user authentication.
Defines a type ApiDog for API response data.
Fetches available dog breeds and handles user authentication changes.
getFetch Function:

Makes an API request to fetch all available dog breeds and stores the result in breedsAll.
tryGet Function:

Makes an API request to search for dogs of the selected breed.
Parses and processes the search results and triggers a toast notification.
Calls postDogs to fetch detailed information about selected dogs.
postDogs Function:

Makes an API request to fetch detailed information about selected dogs.
Stores the response data in resData and sets isDogSelect to true.
Dropdown Handling Functions:

toggleDropdown: Toggles the dropdown open and closed.
selectBreed: Sets the selected breed, closes the dropdown, and triggers the search.
Template Section:

Renders a Toast component for displaying notifications.
Conditionally renders the search input and results based on user authentication status (isLog).
Provides an input field for selecting a breed and a dropdown with available breed options.
Displays dog cards when isDogSelect is true.
Style Section:

Defines CSS styles for various elements, including dog cards, input, dropdown, and breed options.
Functionality:

Users can select a breed from the dropdown, triggering a search for dogs of that breed.
The search results are displayed as dog cards, including images and details.
Toast notifications are shown for search results and updates.
Notes:

This component relies on external APIs for dog data, so ensure that the APIs are available and accessible.
Adjust the CSS styles as needed to match the desired UI appearance. -->