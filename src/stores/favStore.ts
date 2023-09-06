import { writable } from 'svelte/store';

// Initialize an empty array as the initial store value
export const favStore = writable<string[]>([]);

