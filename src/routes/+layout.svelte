<script lang="ts">
	import '../app.postcss';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

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
</script>

<!-- <AppShell>...</AppShell> -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<h3>Omar Galdámez</h3></svelte:fragment
			>
			<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
		</AppBar>
	</svelte:fragment>
</AppShell>
<slot />
