<script lang="ts">
	import '../app.postcss';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { personStore } from '../stores/personStore';
	import { toggleStore } from "../stores/toggleStore"
  import { userDataStore } from "../stores/userDataStore"
	import LogoutBtn from '../components/LogoutBtn.svelte';
	import Modal from '../components/Modal.svelte';
  import { setContext } from 'svelte';
	import AddPersonForm from '../components/AddPersonForm.svelte';

	initializeStores();
	// Highlight JS
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, AppBar, AppShell } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { getContext } from 'svelte';

	let person: unknown = null; // Initialize to null or a default value
	let isLog: boolean | null = null; // Initialize to null or a default value
	let showModal: boolean = false;

	let toggleModal = (() => {
	  showModal = !showModal;
	  toggleStore.set({showModal})
	});
	// Subscribe to changes in the store
	personStore.subscribe((value) => {
		person = value;
		console.log('PERSON LAYOUT: ', person);
	});

	toggleStore.subscribe((isToggle) => {
showModal = isToggle.showModal
console.log("SHOW MODAL: ", showModal)
	})

		// Subscribe to changes in the store
		userDataStore.subscribe((userData) => {
		isLog = userData.isLog;
		console.log('isLOg: ', isLog);
	});

	
  // Set up context and provide the 'person' data
  setContext('person', person);

  
  // Create a reactive declaration to update 'person' in context
  $: {
    setContext('person', person);
  }

  
	const addPerson = ((e: { detail: any; }) =>{
console.log("dispatch add person: ",e.detail)
	  person = e.detail
	  showModal=false
    // Update the store with the new 'person' value
    personStore.set(person);
	});
</script>


<Modal {showModal} >
	<AddPersonForm on:addPerson={addPerson}/>
  </Modal>


<!-- <AppShell>...</AppShell> -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<h3>Omar Galdámez</h3></svelte:fragment>
				{#if isLog === true}
				<LogoutBtn/>
				{/if}
				{#if isLog === false}
				<button class="btn variant-filled-warning" on:click={toggleModal}>
					LOGIN
				</button>
				{/if}
			<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
		</AppBar>
	</svelte:fragment>
</AppShell>

<slot />
