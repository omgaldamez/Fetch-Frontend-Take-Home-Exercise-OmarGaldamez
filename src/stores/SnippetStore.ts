/* eslint-disable prefer-const */
import { writable, get } from "svelte/store";

// SnippetStore
// Code Snippet
// Title, Code, Language, Favorite


export const snippetStore = writable<Dog[]>([]); // [codesnippet1,codesnippet2,etc.]

// deleteSnippet
export function deleteSnippet(index: number) { // if you have a db, delete by ID?
    let snippets = get(snippetStore);
    console.log("DELETE SNIPPET: ", snippets)
    snippets.splice(index, 1); // removes one item from index "index"
    snippetStore.update(() => { // CodeSnippet[]
        return snippets;
    });
}

// toggleFavorite
export function toggleFavorite(index: number) {
    let snippets = get(snippetStore);
    console.log("FAV SNIPPET: ", snippets)
    snippetStore.update(() => { // [ { favorite: true }, { favorite: false } ]  1
        return snippets.map((snippet, snippetIndex) => {
            if(snippetIndex === index) {
                return { ...snippet, favorite: !snippet.favorite }
            }
            return snippet;
        });
    });
}