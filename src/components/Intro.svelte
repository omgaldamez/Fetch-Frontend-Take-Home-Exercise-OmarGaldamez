<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<div class="container h-full w-4/5 mx-auto flex justify-center items-center">
	<div class="space-y-5" transition:fly={{ x: 200, duration: 500 }}>
		<h1 class="h1 text-center">Omar Galdámez</h1>

		<img src="./PortadaGit.svg" alt="logo" />
		<h2 class="h2 text-center">Fetch Frontend Take-Home Exercise</h2>
	</div>
</div>

<style>
	.container {
		height: 90vh;
	}
</style>
