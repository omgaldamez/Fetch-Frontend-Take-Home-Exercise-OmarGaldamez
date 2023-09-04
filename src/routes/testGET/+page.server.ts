// import type { PageServerLoad } from './$types';
// import axios from "axios"



// export const load = (async() => {

//     axios.post("https://frontend-take-home-service.fetch.com/auth/login", {
// name: "John",
// email: "test123@email.com"
// }, {
// withCredentials: true // Set withCredentials to true
// })
// .then(res => {
//     // Access the response headers
//     const cookies = res.headers['set-cookie'];

//     // Log the cookies (if any)
//     if (cookies) {
//         console.log("Cookies received:", cookies);
//     }

//     // Log the response data (if needed)
//     console.log("Response data:", res);
    
    
//     axios.get("https://frontend-take-home-service.fetch.com/dogs/breeds",{
//         withCredentials: true
//     })
//     .then(getResponse => {
//       console.log("GET Response:", getResponse);
//     })
//     .catch(error => {
//         console.error(error); // Handle any errors here
//     });

// })
// .catch(error => {
//     console.error(error); // Handle any errors here
// });

// axios.post("https://frontend-take-home-service.fetch.com/auth/logout")

// })satisfies PageServerLoad;

// // export const load = (async () => {
// //     const response = await axios.get("https://frontend-take-home-service.fetch.com/dogs/breeds", {
// //         headers: {
// //           'Accept-Encoding': 'application/json',
// //         },
// //       });   
    
// //       console.log(response)
// //     return {
// //         data: response.data
// //     } 
// // })satisfies PageServerLoad;


// // export const load = (async () => {
// //     const response = await axios.get("https://jsonplaceholder.typicode.com/users", {
// //       headers: {
// //         'Accept-Encoding': 'application/json',
// //       },
// //     });

// //     if (response.status === 200) {
// //       console.log(response.data);
// //       return response.data;
// //     } else {
// //         console.log("error")
// //       // Handle other status codes or errors as needed
// //       throw new Error(`Request failed with status ${response.status}`);
// //     }
// // })satisfies PageServerLoad;
