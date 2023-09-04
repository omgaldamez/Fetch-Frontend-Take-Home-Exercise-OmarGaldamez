<script lang="ts">
	import Prueba from "./Prueba.svelte";
	import Modal from '../components/Modal.svelte';
	import AddPersonForm from '../components/AddPersonForm.svelte';

	let showModal = true;
  
	let toggleModal = (() => {
	  showModal = !showModal;
	});

	let people = [
	  { name: 'yoshi', beltColour: 'black', age: 25, id: 1 },
	  { name: 'mario', beltColour: 'orange', age: 45, id: 2 },
	  { name: 'luigi', beltColour: 'brown', age: 35, id: 3 }
	];
	const handleClick = (() => {
	  //console.log(e);
	});

	const addPerson = ((e: { detail: any; }) =>{
//console.log(e.detail)
	  const person = e.detail
	  people = [person,...people]
	  showModal=false
	});
</script>


<Modal {showModal} on:click={toggleModal}>
	<AddPersonForm on:addPerson={addPerson}/>
  </Modal>


<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->


<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Omar Galdamez</h1>
		
<img src="./PortadaGit.svg" alt="logo">

<Prueba/>
	</div>
</div>
