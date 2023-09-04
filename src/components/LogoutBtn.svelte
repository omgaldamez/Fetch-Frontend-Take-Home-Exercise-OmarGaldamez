<script lang="ts">
	import axios from 'axios';

	import { createEventDispatcher } from 'svelte';
	import { userDataStore } from '../stores/userDataStore';

	let isFocused: boolean = true
	let postName: string = ''
	let postEmail: string = ''
	
	let isLog: boolean = false // Initialize to null or a default value


  // Subscribe to changes in the userDataStore
  userDataStore.subscribe((userData) => {
    postName = userData.postName
    postEmail = userData.postEmail
	isLog = userData.isLog
  });


const postLogOut = (async() => {

	console.log('LO NAME: ', postName)
		console.log('LO EMAIL: ', postEmail)
	console.log('IS LOG: ', isLog)
		isLog=false
axios.post("https://frontend-take-home-service.fetch.com/auth/logout", {
name: postName,
email: postEmail
}, {
withCredentials: true
})
.then(res => {
    
  userDataStore.set({postName, postEmail, isLog})
console.log("LOGOUT")
	console.log('LOGOUT IS LOG: ', isLog)
console.log(res)

})

})
</script>


		<button class="btn variant-filled-error" on:click={postLogOut}>
			Log Out
		</button>

<style>

</style>
