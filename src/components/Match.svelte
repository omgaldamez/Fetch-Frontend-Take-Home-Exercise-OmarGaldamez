<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { favStore } from '../stores/favStore';
	import { postDogs } from '../stores/postDogMatch';
	import axios from 'axios';
  
	// Initialize selectedBreeds from favStore
	let selectedBreeds: string[] = $favStore;
	let bestMatch: string;
	let breeds: string[];
	let resData: any[] = [];
  
	// Check if there are selected breeds and fetch data
	if (selectedBreeds.length > 0) {
	  console.log('Fetching data...');
	  postDogs(selectedBreeds)
		.then((resMatch) => {
		  bestMatch = resMatch;
		  console.log('Best Match:', bestMatch);
		  tryGet();
		})
		.catch((error) => {
		  console.error(error);
		});
	}
  
	// Fetch data from an API
	const tryGet = () => {
	  console.log('Entering tryGet');
	  console.log('Selected Breed: ', bestMatch);
  
	  axios
		.get(`https://frontend-take-home-service.fetch.com/dogs/search?breeds=${bestMatch}&size=50`, {
		  withCredentials: true,
		})
		.then((res) => {
		  console.log(res.data.resultIds);
		  console.log(res.data);
  
		  breeds = res.data.resultIds.map((resultId: string) => {
			return {
			  resultIds: resultId,
			  total: res.data.total,
			};
		  });
  
		  postDogsMatch(res.data.resultIds);
		})
		.catch((error) => {
		  console.error(error);
		});
	};
  
	// Post data to an API
	const postDogsMatch = async (dogsId: string[]) => {
	  console.log('Posting dogs ID: ', dogsId);
  
	  axios
		.post('https://frontend-take-home-service.fetch.com/dogs', dogsId, {
		  withCredentials: true,
		})
		.then((res) => {
		  const cookies = res.headers['set-cookie'];
  
		  // Log the response data if needed
		  //console.log('Response data:', res.data);
  
		  resData = res.data;
  
		  // Now resData should be an array of objects
		  //console.log(resData);
		})
		.catch((error) => {
		  console.error(error); // Handle any errors here
		});
	};
  </script>
  
  {#if selectedBreeds.length > 0}
  <h1 class="h1">Your Best Match is: {bestMatch}!!!</h1>
  <div class="dogCards">
	{#each resData as breedSel}
	<div class="dC">
	  <header>
		<img src={breedSel.img} alt="Post" />
	  </header>
	  <div class="p-4 space-y-4">
		<h6 class="h6" data-toc-ignore>Age: {breedSel.age} years</h6>
		<h3 class="h3" data-toc-ignore>Name: {breedSel.name}</h3>
	  </div>
	  <hr class="opacity-50" />
	  <footer class="p-4 flex justify-start items-center space-x-4">
		<Avatar src={'./fetchLogo.svg'} width="w-8" />
		<div class="flex-auto flex justify-between items-center">
		  <h6 class="font-bold" data-toc-ignore>Zip Code: {breedSel.zip_code}</h6>
		  <small>On {new Date().toLocaleDateString()}</small>
		</div>
	  </footer>
	</div>
	{/each}
  </div>
  {:else}
  <p>No selected breeds</p>
  {/if}
  
  <style>
	.dogCards {
	  display: flex;
	  flex-direction: row;
	  flex-wrap: wrap;
	  justify-content: center;
	}
  
	.dC {
	  width: 300px; 
	  margin: 18px;
	  border: 1px solid #333;
	  border-radius: 12px;
	  display: flex;
	  flex-direction: column;
	}
  
	.dC header {
	  max-height: 200px; 
	  overflow: hidden; 
	  text-align: center;
	  border-radius: 12px;
	}
  
	.dC header img {
	  max-width: 100%; 
	  height: auto;
	}
  
  </style>
  

  <!-- **Code Description:**

This TypeScript script, embedded in a Svelte component, fetches and displays dog breed information based on user-selected breeds. It communicates with an API to retrieve and present data in a visually appealing format. Here's a breakdown of the code:

1. **Imports:**
   - `Avatar`, `favStore`, `postDogs`: These are imported dependencies used in the script.
   - `axios`: Axios is a popular JavaScript library for making HTTP requests.

2. **Initialization:**
   - `selectedBreeds`: It initializes an array with selected dog breeds fetched from the `favStore` store.
   - `bestMatch`: This variable stores the "best match" breed.
   - `breeds`: An array to store breed information.
   - `resData`: An array to store the response data from API requests.

3. **Fetch Data Condition:**
   - The code checks if there are selected breeds in the `selectedBreeds` array.
   - If there are selected breeds, it initiates data fetching by calling `postDogs` to get the "best match" breed.
   - If an error occurs during fetching, it logs the error.

4. **Data Fetching (`tryGet` function):**
   - The `tryGet` function is responsible for fetching breed-specific data.
   - It makes an Axios GET request to the API using the "best match" breed.
   - The response data includes breed information such as `resultIds` and `total`.
   - The `resultIds` are mapped to an array of objects in the `breeds` variable.
   - It then calls the `postDogsMatch` function to post data.

5. **Data Posting (`postDogsMatch` function):**
   - The `postDogsMatch` function posts dog IDs to an API.
   - It makes an Axios POST request to the API with the dog IDs.
   - The response data is stored in the `resData` array.
   - This data is expected to be an array of objects.

6. **Conditional Rendering:**
   - The code conditionally renders elements based on the presence of selected breeds.
   - If there are selected breeds, it displays the "best match" breed and a list of dog cards.
   - Each dog card contains information about the dog, including an image, age, name, and zip code.
   - If there are no selected breeds, it displays a message indicating that no breeds are selected.

7. **Styling:**
   - The code includes inline CSS styles for styling the dog cards and their contents.
   - It ensures that the cards are displayed in a row layout with appropriate spacing and formatting.

This Svelte component provides a user-friendly way to fetch and display dog breed information based on user preferences, offering a responsive and visually appealing interface. -->