<script lang="ts">
	import Tabs from '../components/Tabs.svelte';
	import { toggleStore } from '../stores/toggleStore';
	import Test from '../components/Test.svelte';
	import { userDataStore } from '../stores/userDataStore';
	import Intro from '../components/Intro.svelte';
	import { fly } from 'svelte/transition';

	// tabs
	let items = ['Search Dogs', 'Favs'];
	let activeItem = 'Current Polls';
	const tabChange = (e: { detail: string }) => (activeItem = e.detail);

	let showModal = true;

	let isLog: boolean | null = null; // Initialize to null or a default value
	// Subscribe to changes in the store
	userDataStore.subscribe((userData) => {
		isLog = userData.isLog;
		console.log('isLOg: ', isLog);
	});

	toggleStore.subscribe((isToggle) => {
		showModal = isToggle.showModal;
		console.log('SHOW MODAL: ', showModal);
	});

	$: {
		console.log('Reactive isLog: ', isLog);
	}
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

{#if isLog === false}
	<Intro />
{/if}

{#if isLog === true}
<main class="h-full w-4/5 mx-auto justify-center items-center">
		<Tabs {activeItem} {items} on:tabChange={tabChange} />
		{#if activeItem === 'Search Dogs'}
			<Test />
		{:else if activeItem === 'Favs'}
			<h2>Tab2</h2>
		{/if}
	</main>
		
	{/if}
