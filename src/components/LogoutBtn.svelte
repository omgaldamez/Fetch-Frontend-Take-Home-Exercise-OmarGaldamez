<script lang="ts">
	import axios from 'axios';
	import { userDataStore } from '../stores/userDataStore';
  
	let postName: string = '';
	let postEmail: string = '';
	let isLog: boolean = false;
  
	// Subscribe to changes in the userDataStore
	userDataStore.subscribe((userData) => {
	  postName = userData.postName;
	  postEmail = userData.postEmail;
	  isLog = userData.isLog;
	});
  
	const postLogOut = async () => {
	  try {
		console.log('Logging out...');
  
		// Make a POST request to log out the user
		const response = await axios.post(
		  'https://frontend-take-home-service.fetch.com/auth/logout',
		  {
			name: postName,
			email: postEmail,
		  },
		  {
			withCredentials: true,
		  }
		);
  
		if (response.status === 200) {
		  console.log('Logout successful');
  
		  // Update the userDataStore with the new isLog value
		  userDataStore.set({ postName, postEmail, isLog: false });
		} else {
		  console.error('Logout failed');
		}
	  } catch (error) {
		console.error('Error while logging out:', error);
	  }
	};
  </script>
  
  <button class="btn variant-filled-error" on:click={postLogOut}>
	Log Out
  </button>
  
  <style>
	/* Add your styles here if needed */
  </style>
  

  <!-- **LogoutBtn Svelte Component**

**Description:**
The `LogoutBtn` Svelte component provides a button that allows users to log out of their account.
It communicates with an authentication server to perform the logout operation and updates the user's authentication status.

**Component Structure:**

**Script Section:**
- The script section of the component imports necessary libraries and initializes variables for user data and authentication status.
- It subscribes to changes in the `userDataStore` store to keep track of user data.
- The `postLogOut` function handles the logout process. It sends a POST request to the server with the user's name and email for authentication.
- If the logout is successful (HTTP status code 200), it updates the `userDataStore` with the new `isLog` value set to `false`.
- Error handling is implemented to catch and log any errors that occur during the logout process.

**Button:**
- The component renders a button element with the text "Log Out."
- When the button is clicked, it triggers the `postLogOut` function to initiate the logout process.

**Style Section:**
- The style section is included for adding custom styles to the button, but it currently contains no specific styles.

**Usage:**
To use this component in your Svelte application, include it in your template where you want to provide a logout button for users.

**External Dependencies:**
- Axios: Used for making HTTP POST requests to the authentication server.
- `userDataStore`: A store for managing user data and authentication status.

**Functions and Logic:**
- `postLogOut()`: Sends a POST request to the server to log the user out. It updates the `userDataStore` with the new `isLog` value, indicating the user is no longer logged in.

**Notes:**
- This component is a part of the authentication and user management system in the application and ensures that user data is updated consistently across the app after a successful logout. -->
