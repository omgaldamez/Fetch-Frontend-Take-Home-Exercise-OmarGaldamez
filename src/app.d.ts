// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

interface Dog {
	id: string
	img: string
	name: string
	age: number
	zip_code: string
	breed: string
}

interface Location {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}