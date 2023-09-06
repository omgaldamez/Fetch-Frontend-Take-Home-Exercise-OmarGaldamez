<script lang="ts">
	export let showModal = false;
	export let isHighlight = false;
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	let tabSet: number = 0;
	// @ts-ignore
	function handleKeyDown(event) {
		if (event.key === 'Escape') {
			// @ts-ignore
			closeModal();
		}
	}
</script>

{#if showModal}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="backdrop w-full h-full fixed"
		class:boxHighlight={isHighlight}
		on:click|self
		on:keydown={handleKeyDown}
	>
		<div class="modal p-2 m-0 absolute text-center">
			<div class="flex w-full h-full">
				<div class="column p-5 text-center">
					<div class="logo">
						<img src="./fetchLogo.svg" alt="imagLand" />
					</div>
				</div>
				<div class="column p-5 text-center">
					<div class="rows flex flex-col w-full h-full justify-around">
						<div class="topLog">
							<h1 class="h1">Welcome to fetch!</h1>
						</div>
						<div class="infoLog h-full">
							<slot />
						</div>
						<div class="bottomLog">
							<TabGroup>
								<Tab bind:group={tabSet} name="tab1" value={0}>
									<svelte:fragment slot="lead">About Us</svelte:fragment>
								</Tab>
								<Tab bind:group={tabSet} name="tab2" value={1}>Give a Home</Tab>
								<Tab bind:group={tabSet} name="tab3" value={2}>Find Nearby!</Tab>
								<!-- Tab Panels --->
								<svelte:fragment slot="panel">
									{#if tabSet === 0}
										We're on a mission to match you with your new best friend from local dog
										shelters. Let's find your perfect companion!
									{:else if tabSet === 1}
										Take the first step today and embark on a rewarding journey filled with
										kindness. Join us in giving these animals the love and care they deserve.
										Together, we can make a world of difference
									{:else if tabSet === 2}
										With shelters in most cities across the country, your opportunity to make a
										lasting impact is closer than you think. Join us in providing these animals with
										the love and care they rightfully deserve
									{/if}
								</svelte:fragment>
							</TabGroup>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.infoLog {
		height: auto;
	}
	.backdrop {
		background: rgba(0, 0, 0, 0.8);
	}
	.modal {
		width: 80vw;
		height: 80vh;
		border-radius: 24px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(0, 0, 0, 0.2);
	}
	.boxHighlight .modal {
		background: crimson;
		color: white;
	}

	.column {
		flex: 1;
	}

	.column:nth-child(odd) {
		background: linear-gradient(-45deg, #e37e5d, #fa8072, #c7665b, #e35d72);
		background-size: 200% 200%;
		animation: gradient 15s ease infinite;
		border-top-left-radius: 18px;
		border-bottom-left-radius: 18px;
	}

	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.column:nth-child(even) {
		background-color: linen;
		border-top-right-radius: 18px;
		border-bottom-right-radius: 18px;
	}

	.logo {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.logo img {
		max-width: 50%;
		max-height: 50%;
	}
</style>

<!-- 
The Modal.svelte component represents a modal dialog that can be toggled on or off based on the showModal variable. The modal can display different content sections in tabs and has an optional highlight effect.

Component Structure:

Script Section:

The script section defines the component's variables, including showModal (controls modal visibility), isHighlight (indicates highlight effect), and tabSet (tracks active tab).
It contains an event listener function handleKeyDown to detect the "Escape" key press and close the modal.
Template Section ({#if showModal}):

This section renders the modal when showModal is true.
It includes a backdrop, modal container, logo, dynamic content slot, and tabbed panels.
Style Section:

Contains CSS styles for various modal elements, including background, size, layout, gradient animation, and logo display.
Usage:
To use this component, include it in your Svelte application and bind the showModal and isHighlight properties as needed. You can also provide dynamic content within the modal using the slot.

External Dependencies:

Skeleton library components: TabGroup and Tab.
Functionality:

The modal can be triggered to open or close by setting the showModal variable.
It supports a highlight effect (isHighlight) that changes the modal's background color.
The "Escape" key press closes the modal.
Tabbed panels allow different content sections to be displayed within the modal.
The component provides flexibility for customization and displaying various types of information within the modal.
Notes:

Ensure that you have the Skeleton library components available for the tab functionality to work correctly.
This component is versatile and can be used for displaying information, prompts, or interactions within a modal -->