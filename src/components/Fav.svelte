<script lang="ts">
	import { slide, scale } from 'svelte/transition';
	import axios from 'axios';
	import { userDataStore } from '../stores/userDataStore';
	import BreedsDetails from './BreedsDetails.svelte';
	import { writable } from 'svelte/store';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	// Create a writable store for the selected breed
	const selectedBreedStore = writable('');

	let breeds: string[];
	let breedsAll: any[] = [];
	let isLog: boolean | null = null; // Initialize to null or a default value

	// Subscribe to changes in the store
	userDataStore.subscribe((userData) => {
		isLog = userData.isLog;
		console.log('isLOg: ', isLog);
	});


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



</script>

<Toast />

<!-- <AppShell>...</AppShell> -->

{#if isLog === true}

	<div class="poll-list">
		{#each breedsAll as dogBreeds, index}
			<div in:slide out:scale|local>
				<header>
					<div class="float-right">
						<button type="button" class="btn btn-sm variant-filled-secondary"> w </button>
						<button type="button" class="btn btn-sm variant-filled-error"> x </button>
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
</style>
