<script lang="ts">
	import axios from 'axios';

	import { createEventDispatcher } from 'svelte';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import { userDataStore } from '../stores/userDataStore';

	// Define component-level variables
	let isFocused: boolean = true; // For focus trapping
	let postName: string = '';
	let postEmail: string = '';
	let isLog: boolean = false;

	// Function to make a POST request when the form is submitted
	const postFetch = async () => {
		console.log('POST NAME: ', postName);
		console.log('POST EMAIL: ', postEmail);

		axios
			.post(
				'https://frontend-take-home-service.fetch.com/auth/login',
				{
					name: postName,
					email: postEmail
				},
				{
					withCredentials: true // Set withCredentials to true for cookies
				}
			)
			.then((res) => {
				// Access and log response headers (cookies)
				const cookies = res.headers['set-cookie'];
				if (cookies) {
					console.log('Cookies received:', cookies);
				}

				// Log the response data if needed
				console.log('Response data:', res.data);

				// Update component state and dispatch an event
				isLog = true;
				dispatch('addPerson', res.data);
				userDataStore.set({ postName, postEmail, isLog });
			})
			.catch((error) => {
				console.error(error); // Handle any errors here
			});
	};

	// Create an event dispatcher for communication with parent components
	let dispatch = createEventDispatcher();

	// Function to handle form submission
	const handleSubmit = () => {
		dispatch('addPerson');
	};

	// Initialize the form and validators
	const form = useForm();
</script>

<div class="logIntro">
	<form use:form use:focusTrap={isFocused} on:submit|preventDefault={handleSubmit}>
		<div class="logEmail">
			<label class="label text-left">
				<span>Email</span>
				<input
					name="email"
					class="input"
					title="Input (email)"
					type="email"
					placeholder="john@example.com"
					autocomplete="email"
					bind:value={postEmail}
					use:validators={[required, email]} 
				/>
			</label>
			<HintGroup for="email">
				<Hint on="required">This is a mandatory field</Hint>
				<Hint on="email" hideWhenRequired>Email is not valid</Hint>
			</HintGroup>
		</div>
		<div class="logPass">
			<label class="label text-left">
				<span>Name</span>
				<input
					name="password"
					class="input"
					title="Input (text)"
					type="text"
					placeholder="John Doe"
					bind:value={postName} 
					use:validators={[required]}
				/>
			</label>
			<Hint for="password" on="required">This is a mandatory field</Hint>
		</div>
		<button
			disabled={!$form.valid} 
			class="btn {$form.valid ? 'variant-filled-success' : 'variant-filled-tertiary'}"
			on:click={postFetch}
		>
			Login
		</button>
	</form>
</div>

<style>
	:global(.touched:invalid) {
		border-color: red;
		outline-color: red;
	}
	.logEmail {
		margin: 24px auto;
		width: 80%;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.logPass {
		margin: 24px auto;
		width: 80%;
		display: flex;
		flex-direction: column;
	}

	input {
		color: black;
	}
</style>


<!-- 
AddPersonForm Svelte Component
Description
The AddPersonForm Svelte component is a form that allows users to input their name and email, and upon submission, it makes a POST request to a backend server for authentication. This component integrates various Svelte and external libraries to handle form validation, event dispatching, and focus trapping.

Usage
To use this component in your Svelte application, follow these steps:

Import the necessary libraries and components:

Component Structure
Script Section: The script section imports external libraries and initializes component-level variables. It defines a function postFetch to make a POST request, sets up event dispatching, and handles form submission.

Form Section: The HTML form includes two input fields for email and name, with corresponding validation hints. The form uses the use:form and use:focusTrap directives to manage form state and focus trapping.

Button: The "Login" button is conditionally disabled based on form validity and triggers the postFetch function when clicked.

Style Section: Styling for the component, including error styles for invalid inputs.

External Dependencies
Axios: Used for making HTTP POST requests to the authentication server.

Svelte-Use-Form: Used for form handling, validation, and managing form state.

Skeleton: Provides the focusTrap utility for trapping focus within the form.

userDataStore: An external store for managing user data. -->