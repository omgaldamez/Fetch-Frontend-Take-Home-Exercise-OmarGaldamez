<script lang="ts">
	import axios from 'axios';

	import { createEventDispatcher } from 'svelte';
	import { useForm, validators, HintGroup, Hint, email, required } from 'svelte-use-form';
	import { focusTrap } from '@skeletonlabs/skeleton';

	let isFocused: boolean = true;
	let postName: string = '';
	let postEmail: string = '';
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
				console.log('Response data:', res);
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

<!-- <form use:form on:submit|preventDefault={handleSubmit}>
<p>Hola</p>
<input type="text" placeholder='name' bind:value={name}>
<p>xd</p>
<input type="number" placeholder='age' bind:value={age}>
<label for="skills">Skills:</label>
<input type="checkbox" bind:group={skills} value="fighting">fighting<br>
<input type="checkbox" bind:group={skills} value="sneaking">sneaking<br>
<input type="checkbox" bind:group={skills} value="running">running<br>
<label for="beltColour">Belt colour:</label>
<select bind:value={beltColour}>
  <option value="black">black</option>
  <option value="orange">orange</option>
  <option value="brown">brown</option>
  <option value="white">white</option>
</select>
<button>Add Ninja</button>
</form> -->

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
