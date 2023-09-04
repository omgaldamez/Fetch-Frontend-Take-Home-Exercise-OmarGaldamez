import type { PageServerLoad } from './$types';
import * as db from "$lib/server/database"

console.log(db)

export const load = (async () => {
    return{
        pruebas: [
            {
                id: 1,
                text: 'This is the first comment'
            },
            {
                id: 2,
                text: 'This is the second comment'
            },
            {
                id: 3,
                text: 'This is the third comment'
            }
        ]
    };
}) satisfies PageServerLoad;


