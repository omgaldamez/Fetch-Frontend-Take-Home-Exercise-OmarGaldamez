<script lang="ts">
	import { slide, scale } from 'svelte/transition';
	import axios from 'axios';
	import { userDataStore } from '../stores/userDataStore';
	import BreedsDetails from './BreedsDetails.svelte';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import { favStore } from '../stores/favStore';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { postDogs } from '../stores/postDogMatch';

	const toastStore = getToastStore();

	// Define the Breed object
	export let breed: Breed = {
		breed: ''
	};

	let isLog: boolean | null = null;

	// Create an array to store the state for each breed
	let breedStates: { breed: string; isFavorite: boolean; buttonText: string }[] = [];

	// Subscribe to changes in the userDataStore
	userDataStore.subscribe((userData) => {
		isLog = userData.isLog;
		console.log('isLog: ', isLog);
	});

	// Function to fetch dog breeds data
	const getFetch = async () => {
		axios
			.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
				withCredentials: true 
			})
			.then((res) => {
				console.log('DATA');
				console.log(res);
				breed.breed = res.data;
				console.log(breed.breed);

				// Initialize breedStates based on fetched data
				breedStates = breed.breed.map((dogB: string) => ({
					breed: dogB,
					isFavorite: false,
					buttonText: 'Save'
				}));
			})
			.catch((error) => {
				console.error(error); 
			});
	};
	getFetch();

	// Initialize an array to store selected breeds
	let selectedBreeds: string[] = [];

	// Function to toggle the favorite state and update the button text
	const toggleFavoriteButton = (index: number, breedName: string) => {
		// Check if the breedName is in selectedBreeds
		const isSelected = selectedBreeds.includes(breedName);

		if (isSelected) {
			// Remove the breedName from selectedBreeds
			selectedBreeds = selectedBreeds.filter((selectedBreed) => selectedBreed !== breedName);
		} else {
			// Add the breedName to selectedBreeds
			selectedBreeds.push(breedName);
		}

		// Toggle isFavorite based on isSelected
		breedStates[index].isFavorite = !isSelected;
		// Update the button text based on isFavorite
		breedStates[index].buttonText = isSelected ? 'Save' : 'Saved!';

		console.log(selectedBreeds);

		// Call postDogs and handle the result
		postDogs(selectedBreeds)
			.then((resMatch) => {
				const t: ToastSettings = {
					message: 'There is a match for ' + resMatch + '!!!',
					timeout: 10000
				};
				toastStore.trigger(t);
				console.log("RES MATCH:", resMatch);
				// Update the favStore with the new selectedBreeds array
				favStore.set(selectedBreeds);
			})
			.catch((error) => {
				console.error(error);
			});
		// Update the favStore with the new selectedBreeds array
		favStore.set(selectedBreeds);
	};

	// Function to initialize selected breeds from favStore
	const loadSelectedBreeds = () => {
		selectedBreeds = $favStore; 
	};

	onMount(() => {
		loadSelectedBreeds();
	});
</script>

<Toast />


{#if isLog === true}
<div class="containerFav">
	<div class="poll-list">
		{#each breed.breed as dogBreeds, index}
			<div in:slide out:scale|local>
				<header>
					<div class="float-right">
						<button
							type="button"
							class="btn btn-sm"
							class:variant-filled-secondary={!breedStates[index].isFavorite}
							class:variant-filled-primary={breedStates[index].isFavorite}
							on:click={() => toggleFavoriteButton(index, dogBreeds)}
						>
							{breedStates[index].buttonText}
						</button>
					</div>
				</header>
				<BreedsDetails {dogBreeds} />
			</div>
		{/each}
	</div>
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
	@media only screen and (max-width: 600px) {

		.containerFav{
		width: 80vw;
		display: flex;
	}
	.poll-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;
	}
}

</style>

<!-- 
**Code Description: Fav.svelte**

The `Fav.svelte` component manages a list of dog breeds, allowing users to mark breeds as favorites.
It fetches breed data from an external source, handles user interactions, and displays toast notifications for breed matching.

**Component Structure:**
- **Script Section:** 
  - Initializes variables, subscribes to user data changes, and fetches data from an external API to populate the list of dog breeds.
  - Handles user interactions such as marking breeds as favorites and triggering toast notifications.
- **Toast Component:** Displays toast notifications for breed matching, utilizing the Skeleton library for this functionality.
- **Conditional Rendering:** Depending on the user's authentication state (`isLog`), the component either displays a list of breeds or prompts the user to log in.
- **Breeds List:** The list of dog breeds is displayed in a grid layout. Each breed item includes a button to mark it as a favorite.
The state of each breed (favorite status and button text) is managed within the component.
- **Style Section:** Contains styles for the grid layout and buttons.

**External Dependencies:**
- **Axios:** Used for making HTTP GET requests to fetch a list of dog breeds.
- **Svelte Stores:** Utilizes writable stores (`favStore` and `userDataStore`) for managing user data and selected breeds.
- **Skeleton:** Utilizes the Toast component from the Skeleton library to display breed matching notifications.

**Functions and Logic:**
- `toggleFavoriteButton(index, breedName)`: Toggles the favorite state of a breed and updates the button text accordingly.
It also calls the `postDogs` function to handle breed matching and displays toast notifications.
- `loadSelectedBreeds()`: Initializes the `selectedBreeds` array from the `favStore` when the component is mounted.

This component enhances the user experience by providing a user-friendly interface for managing favorite dog breeds and notifying users of breed matches.
It supports user authentication and integrates external libraries to handle various functionalities. -->