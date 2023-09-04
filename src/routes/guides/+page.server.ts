import type { PageServerLoad } from './$types';
import axios from "axios"

export const load = (async() => {

    axios.get("https://frontend-take-home-service.fetch.com/dogs/breeds", {
    withCredentials: true // Set withCredentials to true
    })
    .then(res => {
    console.log("DATOS")
    console.log(res)
    return{res}
    })
    .catch(error => {
    console.error(error); // Handle any errors here
    });
    }) satisfies PageServerLoad;