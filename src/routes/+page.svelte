<script lang="ts">
	import Prueba from "./Prueba.svelte";
	import Modal from '../components/Modal.svelte';
	import AddPersonForm from '../components/AddPersonForm.svelte';
	import Tabs from "../components/Tabs.svelte";
  import { setContext } from 'svelte';
  import { personStore } from "./personStore";
	import { toggleStore } from "./toggleStore"
	
	// tabs
	let items = ["Search Dogs", "Favs"]
	let activeItem = "Current Polls"
  const tabChange = (e: { detail: string; }) => activeItem = e.detail;

	let showModal = true;
	let person =""
  
	let toggleModal = (() => {
	  showModal = !showModal;
	});

	toggleStore.subscribe((isToggle) => {
showModal = isToggle.showModal
console.log("SHOW MODAL: ", showModal)
	})


	const addPerson = ((e: { detail: any; }) =>{
console.log("dispatch add person: ",e.detail)
	  person = e.detail
	  showModal=false
    // Update the store with the new 'person' value
    personStore.set(person);
	});

  // Set up context and provide the 'person' data
  setContext('person', person);

  
  // Create a reactive declaration to update 'person' in context
  $: {
    setContext('person', person);
  }

	
</script>


<Modal {showModal} >
	<AddPersonForm on:addPerson={addPerson}/>
  </Modal>


<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->


<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Omar Galdamez</h1>
		
<img src="./PortadaGit.svg" alt="logo">



{#if person === "OK"}
<main>
	<Tabs {activeItem} {items} on:tabChange={tabChange} />
	{#if activeItem === "Search Dogs"}
	<h2>Tab1</h2>
	{:else if activeItem === "Favs"}
	<h2>Tab2</h2>
	{/if}
	<slot />
</main>
{/if}

	</div>
</div>
