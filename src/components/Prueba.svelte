<!-- TEST - IGNORE -->

<script lang="ts">
    import axios from "axios"


    const postFetch = (async() => {

axios.post("https://frontend-take-home-service.fetch.com/auth/login", {
"name": "John",
"email": "test123@email.com"
}, {
withCredentials: true // Set withCredentials to true
})
.then(res => {
// Access the response headers
const cookies = res.headers['set-cookie'];

// Log the cookies (if any)
if (cookies) {
    console.log("Cookies received:", cookies);
}

// Log the response data (if needed)
console.log("Response data:", res);

})
.catch(error => {
console.error(error); // Handle any errors here
});
})


const getFetch = (async() => {

axios.get("https://frontend-take-home-service.fetch.com/dogs/breeds", {
withCredentials: true // Set withCredentials to true
})
.then(res => {
console.log("DATOS")
console.log(res)

})
.catch(error => {
console.error(error); // Handle any errors here
});
})

const getDogs = (async() => {

    const queryParams = {
      breeds: ["Pug", "Affenpinscher","Golden Retriever"], 
      ageMin: 1,                    
      ageMax: 10                     
    };

console.log(queryParams)

    // Convert the query parameters object into a query string
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(JSON.stringify(value))}`)
      .join('&');

      console.log(queryString)

axios.get("https://frontend-take-home-service.fetch.com/dogs/search?${queryString}", {
withCredentials: true // Set withCredentials to true
})
.then(res => {
console.log("DATOS")
console.log(res.data)

})
.catch(error => {
console.error(error); // Handle any errors here
});
})



</script>

<button on:click={postFetch}>
    Login
</button>


<button on:click={getFetch}>
    getDataBreeds
</button>

<button on:click={getDogs}>
    getDataDogs
</button>
