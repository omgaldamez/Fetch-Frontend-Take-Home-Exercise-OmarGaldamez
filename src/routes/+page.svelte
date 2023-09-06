<script lang="ts">
	import Tabs from '../components/Tabs.svelte';
	import { toggleStore } from '../stores/toggleStore';
	import Fav from '../components/Fav.svelte';
	import Search from '../components/Search.svelte';
	import { userDataStore } from '../stores/userDataStore';
	import Intro from '../components/Intro.svelte';
	import Match from '../components/Match.svelte';
	import { favStore } from '../stores/favStore';

	// tabs
	let items = ['Search Dogs', 'Favs', 'Best Match'];
	let activeItem = 'Search Dogs';
	const tabChange = (e: { detail: string }) => (activeItem = e.detail);

	let showModal = true;

	let isLog: boolean | null = null; // Initialize to null or a default value
	// Subscribe to changes in the store
	userDataStore.subscribe((userData) => {
		isLog = userData.isLog;
	});

	toggleStore.subscribe((isToggle) => {
		showModal = isToggle.showModal;
	});

	// Initialize selectedBreeds from favStore
	let selectedBreeds: string[] = $favStore;
</script>

{#if isLog === false}
	<Intro />
{/if}

{#if isLog === true}
	<main class="h-full w-4/5 mx-auto justify-center items-center">
		<Tabs {activeItem} {items} on:tabChange={tabChange} />
		{#if activeItem === 'Search Dogs'}
			<Search />
		{:else if activeItem === 'Favs'}
			<Fav />
		{:else if activeItem === 'Best Match'}
			<Match />
		{/if}
	</main>
{/if}
