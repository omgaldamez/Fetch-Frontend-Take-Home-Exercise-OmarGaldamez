<script lang="ts">
	import Card from './Card.svelte';
	export let dogBreeds: string;
</script>

<Card>
	<div class="poll">
		<h3 class="h3">{dogBreeds}</h3>
	</div>
</Card>
