<script lang="ts">
	import axios from 'axios';

	import { createEventDispatcher } from 'svelte';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import { userDataStore } from '../stores/userDataStore';


	let isFocused: boolean = true;
	let postName: string = '';
	let postEmail: string = '';
	let isLog: boolean = false;

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
					withCredentials: true // Set withCredentials to true
				}
			)
			.then((res) => {
				// Access the response headers
				const cookies = res.headers['set-cookie'];

				// Log the cookies (if any)
				if (cookies) {
					console.log('Cookies received:', cookies);
				}

				// Log the response data (if needed)
				console.log('Response data:', res.data);
				isLog=true
				dispatch("addPerson",res.data)
				userDataStore.set({ postName, postEmail, isLog })
			})
			.catch((error) => {
				console.error(error); // Handle any errors here
			});
	};

	let dispatch = createEventDispatcher();

	const handleSubmit = () => {
		dispatch('addPerson');
	};

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
