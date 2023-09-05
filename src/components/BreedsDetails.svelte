<script>
	import { createEventDispatcher } from 'svelte';
	import Card from './Card.svelte';
	import breedStore from '../stores/breedsStore';
	/**
	 * @type {any}
	 */
	 export let dogBreeds;

	


</script>

<Card>
	<div class="poll">
		<h3>{dogBreeds}</h3>
    </div>
	
</Card>

<style>
	h3 {
		margin: 0 auto;
		color: #555;
	}

</style>
