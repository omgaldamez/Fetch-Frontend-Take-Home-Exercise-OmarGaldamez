import {writable} from "svelte/store"

const PollStore = writable([
    {
      breed: "SchnawserOzzy",
    },
  ]);

  export default PollStore