<script lang="ts">
	// @ts-nocheck

	import { fly } from 'svelte/transition';
	// @ts-nocheck

	import { createEventDispatcher } from 'svelte';
	let dispatch = createEventDispatcher();

	/**
	 * @type {any}
	 */
	export let items;
	// @ts-ignore
	export let activeItem;
</script>

<div class="tabs" transition:fly={{ x: 200, duration: 1500 }}>
	<ul>
		{#each items as item}
			<li>
				<button
					on:click={() => dispatch('tabChange', item)}
					on:keydown={(event) => {
						if (event.key === 'Enter' || event.key === 'Space') {
							dispatch('tabChange', item);
						}
					}}
				>
					<div class:active={item === activeItem}>{item}</div>
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	.tabs {
		margin-bottom: 40px;
	}
	ul {
		display: flex;
		justify-content: center;
		padding: 0;
		list-style-type: none;
	}
	li {
		margin: 0 16px;
		font-size: 18px;
		color: #555;
	}
	.active {
		color: #d91b42;
		border-bottom: 2px solid #d91b42;
		padding-bottom: 8px;
	}
	button {
		border: none;
		background: none;
		cursor: pointer;
	}
</style>
