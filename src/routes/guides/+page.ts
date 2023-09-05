// import type { PageLoad } from "./$types"
// import axios from "axios"

// type IndexDog = {
//   resultIds: string[]
//   total: number
// }
// const test="Pug"

// export const load = (async () => {

//     axios.get("https://frontend-take-home-service.fetch.com/dogs/search", {
//         withCredentials: true // Set withCredentials to true
//         })
//         .then(res => {
//         console.log("DATOS")
//         console.log(res)
//         const breeds=res.data.map((dogB: IndexDog) => {
//             return {
//                 resultIds: `https://frontend-take-home-service.fetch.com/dogs/search/${test}`,
//                 total: `https://frontend-take-home-service.fetch.com/dogs/search/${test}`,
//             }
//         })
//         return {
//           breeds
//         }
//     })

// }) satisfies PageLoad