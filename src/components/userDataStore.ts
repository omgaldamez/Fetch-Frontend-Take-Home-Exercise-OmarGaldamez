// userDataStore.js
import { writable } from 'svelte/store';

export const userDataStore = writable({ postName: '', postEmail: '', isLog: false });
